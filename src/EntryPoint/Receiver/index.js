import root, { job, version } from "./import.js"
import { _, utils, dayjs, logger, systemInfo } from "../../Common/common.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { Timestamp, Transaction, DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";
import D_RequestManager, { D_ReportRequest } from "../../FireStoreAPI/Collection/D_ReportRequest/manager.js";
import { M_Request } from "../../FireStoreAPI/Collection/M_Request/manager.js"
import L_ErrorManager from "../../FireStoreAPI/Collection/L_Error/manager.js"
import M_ErrorManager, { M_Error } from "../../FireStoreAPI/Collection/M_Error/manager.js";
import { M_Account } from "../../FireStoreAPI/Collection/M_Account/class.js";
/**
 * エントリーポイント
 * @returns 
 */
async function main() {
    L_ErrorManager.initialize(job, version, "WRITE|SAVE");

    // 次回起動時間を保存
    systemInfo.nextTime = dayjs().add(60, 'minute').startOf('hour');

    // 並列処理用にランダム時間待機
    await utils.wait(Math.floor((Math.random() * 3 + 1) * 1000) / 1000);

    // これをtransactionにする。
    const obj = await startup();
    const doc = obj.S_RunningState;
    if (!doc) {
        logger.warn(`[起動失敗][State取得失敗]`);
        return;
    }
    /**
     * @type {S_RunningState}
     */
    const state = doc.data();

    logger.info(`[起動][${state.tag}][Version = ${version}]`);

    logger.info(`[定期受信開始]`);

    // 開放処理
    //await release();

    // キャッシュ
    await collectiomManager.caching();

    // アカウント分起動する
    const syncObj = { abort: false, state: state, rateLimit: rateLimit };
    while (true) {
        let first = true;
        if (systemInfo.sigterm) {
            logger.warn("[SIGTERM検出][処理中断]");
            break;
        }
        const ret = await createTasks(syncObj, first);
        if (ret.every(r => r.status == "fulfilled")) {
            logger.info("[全タスク正常終了][リクエスト処理完了]");
            break;
        }
        if (ret.every(r => r.status == "rejected")) {
            logger.error("[全タスク異常終了][今回処理中断]");;
            break;
        }
        logger.info("[エラー検知][全タスク再起動]");
        first = false;
    }

    logger.info(`[定期受信終了]`);
    return;
}

/**
 * 非同期タスクを作成します。
 * @param {object} syncObj
 * @param {boolean} first
 * @returns 
 */
async function createTasks(syncObj, first) {
    const tasks = [];
    syncObj.abort = false;
    for (const accountRef of syncObj.state.accountRefs.concat()) {
        const accountDoc = await collectiomManager.get(accountRef);
        const account = accountDoc.data();
        if (!account.valid) continue;
        tasks.push(runAsync(accountDoc, syncObj, first));
        // 5秒待機
        await utils.wait(5);
    }
    return Promise.allSettled(tasks);
}

/**
 * 非同期で処理を行います。
 * @param {DocumentSnapshot} accountDoc
 * @param {object} syncObj 
 * @param {boolean} first
 */
async function runAsync(accountDoc, syncObj, first) {
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
    /**
     * @type {D_ReportRequest}
     */
    logger.info(`[タスク開始][アカウント=${account.tag}]`);

    // 初期起動時は復活処理
    try {
        if (first) {
            const date = dayjs(syncObj.state.nextTime.toDate());
            const docs = await getPreviewRequest(date, accountDoc);
            if (docs.length) {
                const maxDoc = await getMaxDate(date, accountDoc);
                const maxDate = dayjs(maxDoc[0].data().requestTime.toDate());
                const firstDate = maxDate > date ? maxDate : date;
                const batch = await fireStoreManager.createBatch();
                let allocation = D_RequestManager.allocation();
                for await (const doc of docs.reverse()) {
                    const drequest = doc.data();
                    const mrequestDoc = await collectiomManager.get(drequest.requestInfo.ref);
                    /**
                     * @type {M_Request}
                     */
                    const mrequest = mrequestDoc.data();
                    let allocDate = firstDate.add(allocation(mrequest.statuses.find(s => s.status == drequest.status).path), "minute");
                    if (allocDate >= systemInfo.nextTime)
                        continue;
                    batch.update(doc.ref, { requestTime: Timestamp.fromDate(allocDate.toDate()), lock: false });
                }
                await fireStoreManager.commitBatch(batch);
                logger.info(`[リクエスト復活][${account.tag}][${docs.length}件][割り当て時刻=${firstDate.format("YYYY-MM-DD HH:mm:ss")}～]`);
            }
        }
    } catch (e) {
        // 握りつぶす
        await L_ErrorManager.onSystemError(e, null);
        throw e;
    }

    let currentDoc;
    try {
        while (!systemInfo.sigterm && !syncObj.abort) {
            const date = dayjs();
            const obj = await getRequest(date, accountDoc);
            const drequestDocs = obj.docs;
            if (!drequestDocs.length) {
                // 終了判定
                const next = await getNextRequest(date, accountDoc);
                if (!next.length) {
                    logger.info(`[タスク終了][アカウント=${account.tag}]`);
                    return;
                }

                const diff = dayjs(next[0].data().requestTime.toDate()).diff(dayjs(), "second");
                if (diff > 0) {
                    const waitMinutes = Math.ceil(diff / 60);
                    logger.debug(`${waitMinutes}分待機`);
                    await utils.wait(waitMinutes * 60);
                }
                continue;
            }
            for await (const drequestDoc of drequestDocs) {
                currentDoc = drequestDoc;
                /**
                 * @type {D_ReportRequest}
                 */
                const drequest = drequestDoc.data();
                const mrequestDoc = await collectiomManager.get(drequest.requestInfo.ref);
                /**
                 * @type {M_Request}
                 */
                const mrequest = mrequestDoc.data();
                const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);
                logger.info(`[リクエスト取得][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${drequest.status}]`);

                // 実行
                const status = mrequest.statuses.find(s => s.status == drequest.status);
                const res = await _.get(root, status.path.split("/"))(drequest, mrequest);
                
                // ステータスなら回数を確認
                if (res.ok == "ok" && !res.next){
                    const nextStatus = drequest.status;
                    let update = {};
                    // 3回目のスキップでキャンセル
                    if(res.reportInfo.continue > 12){
                        update = await _.get(root, "FireStoreAPI/Collection/M_Error/Handle/cancel".split("/"))(drequest, syncObj);
                        update.reportInfo = res.reportInfo;
                    }
                    if(res.reportInfo.continue > 9){
                        update = await _.get(root, "FireStoreAPI/Collection/M_Error/Handle/skipOnce".split("/"))(drequest, syncObj);
                        update.reportInfo = res.reportInfo;
                    }
                    else{
                        const nextTime = Timestamp.fromDate(dayjs().add(1, "minute").toDate());
                        update = { requestTime: nextTime, reportInfo: res.reportInfo, status: nextStatus, lock: false };
                    }
                    await fireStoreManager.updateRef(drequestDoc.ref, update);
                }
                // okなら次へ進める
                else if (res.ok == "ok") {
                    const index = drequest.statuses.indexOf(drequest.status);
                    const nextStatus = drequest.statuses[index + 1] || "COMPLETED";
                    const nextTime = Timestamp.fromDate(dayjs().add(1, "minute").toDate());
                    if ("created" in res.reportInfo && res.reportInfo.created) {
                        // TimeStampに戻す https://stackoverflow.com/questions/57898146/firestore-timestamp-gets-saved-as-map
                        res.reportInfo.created = new Timestamp(res.reportInfo.created._seconds, res.reportInfo.created._nanoseconds);
                    }
                    if ("expiration" in res.reportInfo && res.reportInfo.expiration) {
                        res.reportInfo.expiration = new Timestamp(res.reportInfo.expiration._seconds, res.reportInfo.expiration._nanoseconds);
                    }
                    await fireStoreManager.updateRef(drequestDoc.ref, { requestTime: nextTime, reportInfo: res.reportInfo, status: nextStatus, lock: false });
                    logger.info(`[リクエスト更新][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${drequest.status}⇒${nextStatus}]`);
                }
                // invalidならアカウント無効
                else if (res.ok == "invalid") {
                    _.remove(syncObj.state.accountRefs, r => r.path == accountDoc.ref.path);
                    fireStoreManager.updateRef(accountDoc.ref, { valid: false });
                    logger.error(`[アカウント無効][${account.tag}][Valid Off]`);
                    return;
                }
                // errorならPG上のエラーハンドリング
                else if (res.ok == "error") {
                    const error = res.error;
                    const handled = await _.get(root, error.handle.split("/"))(drequest, syncObj);
                    await fireStoreManager.updateRef(drequestDoc.ref, handled);
                    logger.warn(`[エラーハンドリング][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${error.tag}][${error.handle}]`);
                }
                // ngならDBを参照してエラーハンドリング
                else if (res.ok == "ng") {
                    const error = await M_ErrorManager.getOrAdd(drequest, res.error);
                    const handled = await _.get(root, error.handle.split("/"))(drequest, syncObj);
                    await fireStoreManager.updateRef(drequestDoc.ref, handled);
                    logger.warn(`[エラーハンドリング][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${error.tag}][${error.handle}]`);
                }
            }

            // 1分待機
            logger.debug(`１分待機`);
            await utils.wait(60);
        }
    } catch (e) {
        syncObj.abort = true;
        await L_ErrorManager.onSystemError(e, currentDoc?.data());
        throw e;
    }
}

/**
 * トランザクション処理を行い、リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentSnapshot} accountDoc 
 */
async function getRequest(date, accountDoc) {
    //transactin
    const getfunc = async (tran, obj) => {
        // 時間のorderbyでとってくる。0件なら終了
        const query = await fireStoreManager.getQuery("D_ReportRequest", [["accountRef", "==", accountDoc.ref], ["status", "!=", "COMPLETED"], ["lock", "==", false], ["requestTime", "<=", Timestamp.fromDate(date.toDate())]]);
        const snapshot = await tran.get(query);
        obj.docs = snapshot.docs;
    }

    const writefunc = async (tran, obj) => {
        const docs = obj.docs;
        if (docs) {
            for (const doc of docs)
                tran.update(doc.ref, { lock: true });
        }
    }

    return await fireStoreManager.transaction([getfunc], [writefunc]);
}

/**
 * リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentSnapshot} accountDoc 
 */
async function getPreviewRequest(date, accountDoc) {
    return fireStoreManager.getDocs("D_ReportRequest", [["accountRef", "==", accountDoc.ref], ["status", "!=", "COMPLETED"], ["requestTime", "<", Timestamp.fromDate(date.toDate())]], [{ column: "requestTime", direction: "desc" }]);
}

async function getMaxDate(date, accountDoc) {
    return fireStoreManager.getDocs("D_ReportRequest", [["accountRef", "==", accountDoc.ref], ["status", "!=", "COMPLETED"], ["requestTime", "<", Timestamp.fromDate(systemInfo.nextTime.toDate())]], [{ column: "requestTime", direction: "desc" }], 1);
}


/**
 * トランザクション処理を行い、次回リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentSnapshot} accountDoc 
 * @param {*} info
 */
async function getNextRequest(date, accountDoc) {
    return await fireStoreManager.getDocs("D_ReportRequest", [["accountRef", "==", accountDoc.ref], ["status", "!=", "COMPLETED"], ["lock", "==", false], ["requestTime", ">", Timestamp.fromDate(date.toDate())], ["requestTime", "<", Timestamp.fromDate(systemInfo.nextTime.toDate())]], [{ column: "requestTime", direction: "asc" }], 1);
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
            if(!systemInfo.isTest())
                tran.update(doc.ref, { nextTime: Timestamp.fromDate(nextTime.toDate()) });
        }
    }

    return await fireStoreManager.transaction([getfunc], [writefunc]);
}

// ------------------エラー時処理--------------------------------//
/**
 * 
 * @param {S_RunningState} state 
 * @returns 
 */
async function rateLimit(accountRef, state) {
    const accountDoc = await collectiomManager.get(accountRef);
    const date = dayjs(state.nextTime.toDate());
    const maxDoc = await getMaxDate(date, accountDoc);
    const ret = dayjs(maxDoc[0].data().requestTime.toDate()).add(1, "minute");
    if(ret >= systemInfo.nextTime)
        return null;
    return ret;
}
// -------------------------------------------------------------//

main();