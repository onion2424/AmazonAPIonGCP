import root, {job, version} from "./import.js"
import { _, utils, dayjs, logger, systemInfo } from "../../Common/common.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { Timestamp, Transaction } from "firebase-admin/firestore";
import { D_ReportRequest } from "../../FireStoreAPI/Collection/D_ReportRequest/class.js";
import { M_Request } from "../../FireStoreAPI/Collection/M_Request/manager.js"
import L_ErrorManager from "../../FireStoreAPI/Collection/L_Error/manager.js"
import M_ErrorManager, { M_Error } from "../../FireStoreAPI/Collection/M_Error/manager.js";
import R_DelayManager from "../../FireStoreAPI/Collection/R_Delay/manager.js"
/**
 * エントリーポイント
 * @returns 
 */
async function main() {
    if (dayjs().minute() % 10 == 0) {
        logger.info("[処理終了][レート回復]");
        return;
    }

    L_ErrorManager.initialize(job, version, "WRITE");

    // 次回起動時間を保存
    systemInfo.nextTime = dayjs().add(1, 'minute').startOf('minute');

    // 並列処理用にランダム時間待機
    await utils.wait(Math.floor((Math.random() * 3 + 1) * 1000) / 1000);

    // これをtransactionにする。
    const obj = await startup();
    const doc = obj.S_RunningState;
    if (!doc) {
        logger.warn(`[起動失敗][State取得失敗][${dayjs(systemInfo.nextTime.toDate()).format("YYYY-MM-DD HH:mm:ss")}]`);
        return;
    }
    /**
     * @type {S_RunningState}
     */
    const state = doc.data();

    logger.info(`[起動][${state.tag}][Version = ${version}]`);

    logger.info(`[バッチ受信開始]`);

    // 開放処理
    // await release();

    // キャッシュ
    //await collectiomManager.caching();

    // host分起動する　いったんPromise.allで
    while (true) {
        if (systemInfo.sigterm) {
            logger.warn("[SIGTERM検出][処理中断]");
            break;
        }
        const ret = await createTasks(doc);
        if (ret.every(r => r.status == "fulfilled")) {
            logger.info("[全ホスト正常終了][リクエスト処理完了]");
            break;
        }
        if (ret.every(r => r.status == "rejected")) {
            logger.error("[全ホスト異常終了][今回処理中断]");;
            break;
        }
        logger.info("[エラー検知][全ホスト再起動]");
    }

    logger.info(`[バッチ受信終了]`);
    return;
}

/**
 * 非同期タスクを作成します。
 * @param {*} stateDoc 
 * @returns 
 */
async function createTasks(stateDoc) {
    const tasks = [];
    const syncObj = { abort: false, state: stateDoc};
    for (const host of stateDoc.data().hosts) {
        tasks.push(runAsync(host, syncObj));
    }
    return Promise.allSettled(tasks);
}

/**
 * 非同期で処理を行います。
 * @param {number} host 
 * @param {object} syncObj 
 */
async function runAsync(host, syncObj) {
    /**
     * @type {D_ReportRequest}
     */
    let currentDoc;
    try {
        logger.info(`[タスク開始][host=${host}]`);
        // ここだけトランザクション処理、以降は並列可能
        const docs = await getRequest(host, syncObj.state);
        if (!docs) {
            logger.info(`[タスク終了][host=${host}]`);
            return;
        }
        for await (const doc of docs) {
            currentDoc = doc;
            /**
             * @type {D_ReportRequest}
             */
            const drequest = doc.data();
            logger.info(`[リクエスト取得][${doc.id}][${drequest.status}]`);

            // 待機時間(10分以上空くなら終了等？)
            //const diff = dayjs(drequest.requestTime.toDate()).diff(dayjs(), "second");
            //if (diff > 0)
            //    await utils.wait(diff);

            // 実行
            const mrequestDoc = await collectiomManager.get(drequest.requestInfo.ref);
            /**
             * @type {M_Request}
             */
            const mrequest = mrequestDoc.data();
            const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);
            const status = mrequest.statuses.find(s => s.status == drequest.status);
            const res = await _.get(root, status.path.split("/"))(drequest, mrequest);

            if (res.ok == "ok") {
                const index = drequest.statuses.indexOf(drequest.status);
                const nextStatus = res.next ? drequest.statuses[index + 1] || "COMPLETED" : drequest.status;
                // 1分後にする
                const nextTime = Timestamp.fromDate(dayjs().add(1, "minute").toDate());
                if ("created" in res.reportInfo && res.reportInfo.created) {
                    // TimeStampに戻す https://stackoverflow.com/questions/57898146/firestore-timestamp-gets-saved-as-map
                    res.reportInfo.created = new Timestamp(res.reportInfo.created._seconds, res.reportInfo.created._nanoseconds);
                }
                await fireStoreManager.updateRef(doc.ref, { requestTime: nextTime, reportInfo: res.reportInfo, status: nextStatus, host: 3 });
                logger.info(`[リクエスト更新][${doc.id}][${drequest.status}⇒${nextStatus}]`);
            }
            // errorならPG上のエラーハンドリング
            else if (res.ok == "error") {
                const error = res.error;
                const handled = await _.get(root, error.handle.split("/"))(drequest, res);
                // hostを保存
                handled.host = drequest.host;
                await fireStoreManager.updateRef(doc.ref, handled);
                logger.warn(`[エラーハンドリング][${doc.id}][${error.tag}][${error.handle}]`);
            }
            // ngならDBを参照してエラーハンドリング
            else if (res.ok == "ng") {
                const error = await M_ErrorManager.getOrAdd(drequest, res.error);
                const handled = await _.get(root, error.handle.split("/"))(drequest, res);
                // hostを保存
                handled.host = drequest.host;
                await fireStoreManager.updateRef(doc.ref, handled);
                logger.warn(`[エラーハンドリング][${doc.id}][${error.tag}][${error.handle}]`);
            }
        }
    } catch (e) {
        syncObj.abort = true;
        await L_ErrorManager.onSystemError(e, currentDoc.data());
        await release(host);
        throw e;
    }
}

/**
 * トランザクション処理を行い、リクエストを取得します。
 * @param {number} host 
 */
async function getRequest(host, state) {
    if (host == 1) {
        return fireStoreManager.getDocs("D_BatchReportRequest", [["ref", "==", state.ref], ["host", "==", host]], [{ column: "requestInfo.date.start", direction: "asc" }], 1);
    }
    else if (host == 2) {
        return fireStoreManager.getDocs("D_BatchReportRequest", [["ref", "==", state.ref], ["host", "==", host]], [{ column: "requestInfo.date.start", direction: "asc" }], 1);
    }
    else {
        return fireStoreManager.getDocs("D_BatchReportRequest", [["ref", "==", state.ref], ["status", "!=", "COMPLETED"], ["host", "==", host], ["requestTime", "<", Timestamp.fromDate(systemInfo.nextTime.toDate())]], [{ column: "requestTime", direction: "asc" }]);
    }
}

/**
 * ホストしているリクエストを開放します。
 * @param {number} host 
 */
async function release(host) {
    // 開放処理
    const condition = host ? ["host", "==", host] : ["host", "!=", 0];
    const docs = await fireStoreManager.getDocs("D_ReportRequest", [condition]);
    if (docs.length > 0) {
        const batch = await fireStoreManager.createBatch();
        for await (const doc of docs) {
            batch.update(doc.ref, { host: 0 });
        }
        await fireStoreManager.commitBatch(batch);
        logger.info(`[全リクエスト開放][host=${host ? host : "all"}][${docs.length}レコード]`);
    }
}

/**
 * 起動を行います。
 * @returns 
 */
async function startup() {
    //transactin
    const getfunc = async (tran, obj) => {
        const query = await fireStoreManager.getQuery("S_RunningState", [["job", "==", job], ["nextTime", "<", Timestamp.fromDate(dayjs().toDate())]], [], 1);
        const snapshot = await tran.get(query);
        for await (const doc of snapshot.docs) {
            obj.S_RunningState = doc;
        }
    }

    const writefunc = async (tran, obj) => {
        const doc = obj.S_RunningState;
        if (doc) {
            const nextTime = systemInfo.nextTime;
            if (!systemInfo.isTest())
                tran.update(doc.ref, { nextTime: Timestamp.fromDate(nextTime.toDate()) });
        }
    }

    return await fireStoreManager.transaction([getfunc], [writefunc]);
}

await main();