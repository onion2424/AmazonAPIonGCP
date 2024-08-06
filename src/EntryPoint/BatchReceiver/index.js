import root, { job, version } from "./import.js"
import { _, utils, dayjs, logger, systemInfo } from "../../Common/common.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { DocumentReference, DocumentSnapshot, FieldValue, Timestamp, Transaction } from "firebase-admin/firestore";
import D_RequestManager, { D_ReportRequest } from "../../FireStoreAPI/Collection/D_ReportRequest/manager.js";
import { M_Request } from "../../FireStoreAPI/Collection/M_Request/manager.js"
import L_ErrorManager from "../../FireStoreAPI/Collection/L_Error/manager.js"
import M_ErrorManager, { M_Error } from "../../FireStoreAPI/Collection/M_Error/manager.js";
import { M_Account } from "../../FireStoreAPI/Collection/M_Account/manager.js";
/**
 * エントリーポイント
 * @returns 
 */
async function main() {
    L_ErrorManager.initialize(job, version, "WRITE|SAVE");
    // 次回起動時間を保存
    systemInfo.nextTime = dayjs().startOf("minute").add(1, 'minute');

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

    while (true) {
        if (systemInfo.sigterm) {
            logger.warn("[SIGTERM検出][処理中断]");
            break;
        }
        const ret = await createTasks(doc);
        if (ret.every(r => r.status == "fulfilled")) {
            logger.info("[全タスク正常終了][リクエスト処理完了]");
            break;
        }
        if (ret.every(r => r.status == "rejected")) {
            logger.error("[全タスク異常終了][今回処理中断]");;
            break;
        }
        logger.info("[エラー検知][全タスク再起動]");
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
    const syncObj = { abort: false, stateDoc: stateDoc };
    for await (const accountRef of stateDoc.data().accountRefs) {
        tasks.push(runAsync(accountRef, syncObj));
    }
    return Promise.allSettled(tasks);
}

/**
 * 非同期で処理を行います。
 * @param {DocumentReference} accountRef 
 * @param {object} syncObj 
 */
async function runAsync(accountRef, syncObj) {
    try {
        /**
         * @type {D_ReportRequest}
         */
        let currentDoc;
        const accountDoc = await collectiomManager.get(accountRef);
        /**
         * @type {M_Account}
         */
        const account = accountDoc.data();
        const date = dayjs().startOf("minute");
        try {
            // 残件
            const count = await getAllRequest(date, accountRef);
            if (count == 0) {
                await fireStoreManager.updateRef(syncObj.stateDoc.ref, { accountRefs: FieldValue.arrayRemove(accountRef) });
                logger.info(`[全件取得完了][バッチ処理終了][${account.tag}]`);
                return;
            }
            else {
                logger.info(`[残り${count}件][${account.tag}]`);
            }

            logger.info(`[タスク開始][${account.tag}]`);
        } catch (e) {
            // 握りつぶす
            await L_ErrorManager.onSystemError(e, currentDoc?.data());
        }
        // ここだけトランザクション処理、以降は並列可能
        const docs = await getRequest(date, accountRef);
        if (!docs.length) {
            logger.info(`[今回処理タスクなし][${account.tag}]`);
            return;
        }
        for await (const doc of docs) {
            try {
                currentDoc = doc;
                /**
                 * @type {D_ReportRequest}
                 */
                const drequest = doc.data();

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

                if (res.ok == "ok") {
                    const index = drequest.statuses.indexOf(drequest.status);
                    const nextStatus = res.next ? drequest.statuses[index + 1] || "COMPLETED" : drequest.status;
                    // 1分後にする
                    const nextTime = Timestamp.fromDate(dayjs().add(1, "minute").toDate());
                    if ("created" in res.reportInfo && res.reportInfo.created) {
                        // TimeStampに戻す https://stackoverflow.com/questions/57898146/firestore-timestamp-gets-saved-as-map
                        res.reportInfo.created = new Timestamp(res.reportInfo.created._seconds, res.reportInfo.created._nanoseconds);
                    }
                    if("expiration" in res.reportInfo && res.reportInfo.expiration){
                        res.reportInfo.expiration = new Timestamp(res.reportInfo.expiration._seconds, res.reportInfo.expiration._nanoseconds);
                    }
                    await fireStoreManager.updateRef(doc.ref, { requestTime: nextTime, reportInfo: res.reportInfo, status: nextStatus });
                    logger.info(`[リクエスト更新][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${drequest.status}⇒${nextStatus}]`);
                }
                // errorならPG上のエラーハンドリング
                else if (res.ok == "error") {
                    const error = res.error;
                    const handled = await _.get(root, error.handle.split("/"))(drequest, res);
                    await fireStoreManager.updateRef(doc.ref, handled);
                    logger.warn(`[エラーハンドリング][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${error.tag}][${error.handle}]`);
                }
                // ngならDBを参照してエラーハンドリング
                else if (res.ok == "ng") {
                    const error = await M_ErrorManager.getOrAdd(drequest, res.error);
                    const handled = await _.get(root, error.handle.split("/"))(drequest, res);
                    await fireStoreManager.updateRef(doc.ref, handled);
                    logger.warn(`[エラーハンドリング][${account.tag}][${mrequest.tag}][${detail.tag}][${drequest.requestInfo.date.start}][${error.tag}][${error.handle}]`);
                }
            } catch (e) {
                // 握りつぶす
                await L_ErrorManager.onSystemError(e, currentDoc?.data());
            }
        }
        
        try {
            // 復活処理
            if (date.minute() == 0) {
                const docs = await getPreviewRequest(date, accountRef);
                if (docs.length) {
                    const maxDoc = await getMaxDate(date, accountRef);
                    const maxDate = dayjs(maxDoc[0].data().requestTime.toDate());
                    const firstDate = maxDate > date ? maxDate : date;
                    const batch = await fireStoreManager.createBatch();
                    const allocation = D_RequestManager.allocation();
                    for await (const doc of docs) {
                        const drequest = doc.data();
                        const mrequestDoc = await collectiomManager.get(drequest.requestInfo.ref);
                        /**
                         * @type {M_Request}
                         */
                        const mrequest = mrequestDoc.data();
                        batch.update(doc.ref, { requestTime: Timestamp.fromDate(firstDate.add(allocation(mrequest.statuses.find(s => s.status == drequest.status).path), "minute").toDate()) });
                    }
                    await fireStoreManager.commitBatch(batch);
                    logger.info(`[リクエスト復活][${account.tag}][${docs.length}件][割り当て時刻=${firstDate.format("YYYY-MM-DD HH:mm:ss")}～]`);
                }
            }
        } catch (e) {
            // 握りつぶす
            await L_ErrorManager.onSystemError(e, currentDoc?.data());
        }
        logger.info(`[タスク完了][${account.tag}]`);
    } catch (e) {
        await L_ErrorManager.onSystemError(e, currentDoc?.data());
        throw e;
    }
}
/**
 * リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentReference} accountRef 
 */
async function getAllRequest(date, accountRef) {
    return fireStoreManager.countDocs("D_BatchReportRequest", [["accountRef", "==", accountRef], ["status", "!=", "COMPLETED"], ["requestTime", ">=", Timestamp.fromDate(dayjs(0).toDate())]]);
}


/**
 * リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentReference} accountRef 
 */
async function getRequest(date, accountRef) {
    return fireStoreManager.getDocs("D_BatchReportRequest", [["accountRef", "==", accountRef], ["status", "!=", "COMPLETED"], ["requestTime", "<", Timestamp.fromDate(systemInfo.nextTime.toDate())], ["requestTime", ">=", Timestamp.fromDate(date.toDate())]]);
}

/**
 * リクエストを取得します。
 * @param {dayjs.Dayjs} date
 * @param {DocumentReference} accountRef 
 */
async function getPreviewRequest(date, accountRef) {
    return fireStoreManager.getDocs("D_BatchReportRequest", [["accountRef", "==", accountRef], ["status", "!=", "COMPLETED"], ["requestTime", "<", Timestamp.fromDate(date.toDate())]]);
}

async function getMaxDate(date, accountRef) {
    return fireStoreManager.getDocs("D_BatchReportRequest", [["accountRef", "==", accountRef], ["status", "!=", "COMPLETED"]], [{ column: "requestTime", direction: "desc" }], 1);
}

/**
 * 起動を行います。
 * @returns 
 */
async function startup() {
    //transactin
    const getfunc = async (tran, obj) => {
        const query = await fireStoreManager.getQuery("S_RunningState", [["job", "==", job]/*, ["nextTime", "<", Timestamp.fromDate(dayjs().toDate())]*/], [], 1);
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