import root from "./import.js"
import { _, utils, dayjs, logger, systemInfo } from "../../Common/systemCommon.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { Timestamp, Transaction } from "firebase-admin/firestore";
import { D_ReportRequest } from "../../FireStoreAPI/Collection/D_ReportRequest/class.js";

/**
 * エントリーポイント
 * @returns 
 */
async function main() {
    // 並列処理用にランダム時間待機
    await utils.wait(Math.floor((Math.random() * 3 + 1) * 1000) / 1000);

    // これをtransactionにする。
    const obj = await startup();
    const doc = obj.S_RunningState;
    if(!doc){
        logger.warn(`[起動失敗][State取得失敗]`);
        return;
    }
    /**
     * @type {S_RunningState}
     */
    const state = doc.data();

    logger.info(`[起動][${state.tag}][Version = ${state.version}]`);

    logger.info(`[定期処理開始]`);

    // 開放処理
    await release();

    // host分起動する　いったんPromise.allで
    let count = 1;
    while (count <= 2) {
        logger.info(`${count}回目起動開始`);
        if (systemInfo.sigterm) {
            logger.warn("[SIGTERM検出][処理中断]");
            break;
        }
        const ret = await createTasks(state.hosts);
        if (!ret.some(r => r.status == "rejected")) break;
        logger.info(`${count}回目起動終了`);
        count++;
    }

    logger.info(`[定期処理終了]`);
}

/**
 * 非同期タスクを作成します。
 * @param {*} hosts 
 * @returns 
 */
async function createTasks(hosts) {
    const tasks = [];
    const syncObj = { abort: false };
    for (const host of hosts) {
        tasks.push(runAsync(host, syncObj));
    }
    return Promise.allSettled(tasks);
}

/**
 * 非同期で処理を行います。
 * @param {*} host 
 * @param {*} syncObj 
 */
async function runAsync(host, syncObj) {
    try {
        logger.info(`[タスク開始][host${host}]`);
        while (!systemInfo.sigterm && !syncObj.abort) {
            // ここだけトランザクション処理、以降は並列可能
            const obj = await getRequest(host);
            const requestDoc = obj.D_ReportRequest;
            if (!requestDoc) {
                logger.info(`[タスク終了][host(${host})]`);
            }
            /**
             * @type {D_ReportRequest}
             */
            const request = requestDoc.data();
            logger.info(`[リクエスト取得][${requestDoc.id}][${request.status}]`);
            throw new Error("test");
            // 開放処理
            //request.ref.update({host: 100});
            //logger.info(`[リクエスト開放][${requestDoc.id}][${request.status}]`);
        }
    } catch (e) {
        syncObj.abort = true;
        logger.error(`[システムエラー発生][エラー内容表示]`, e);
        await release(host);
        throw e;
    }
}

/**
 * トランザクション処理を行い、リクエストを取得します。
 * @param {number} host 
 */
async function getRequest(host) {
    //transactin
    const getfunc = async (tran, obj) => {
        // 時間のorderbyでとってくる。0件なら終了
        const query = await fireStoreManager.getQuery("D_ReportRequest", [["status", "!=", "COMPLETED"], ["host", "==", 0]], [{ column: "requestTime", direction: "asc" }], 1);
        const snapshot = await tran.get(query);
        for await (const doc of snapshot.docs) {
            /**
             * @type {S_RunningState}
             */
            obj.D_ReportRequest = doc;
        }
    }

    const writefunc = async (tran, obj) => {
        const doc = obj.D_ReportRequest;
        if(doc){
            tran.update(doc.ref, { host: host });
        }
    }

    return await fireStoreManager.transaction([getfunc], [writefunc]);
}

/**
 * ホストしているリクエストを開放します。
 * @param {number} host 
 */
async function release(host){
    // 開放処理
    const condition = host ? ["host", "==", host] : ["host", "!=", 0];
    const docs = await fireStoreManager.getDocs("D_ReportRequest", [condition]);
    if (docs.length > 0) {
        const batch = await fireStoreManager.createBatch();
        for await (const doc of docs) {
            batch.update(doc.ref, { host: 0 });
        }
        batch.commit();
        logger.info(`[host = ${host ? host : "all"}開放][${docs.length}レコード]`);
    }
}

/**
 * 起動を行います。
 * @returns 
 */
async function startup() {
    //transactin
    const getfunc = async (tran, obj) => {
        const query = await fireStoreManager.getQuery("S_RunningState", [["job", "==", "RECEIVER"], ["nextTime", "<", Timestamp.fromMillis(dayjs())]], [], 1);
        const snapshot = await tran.get(query);
        for await (const doc of snapshot.docs) {
            obj.S_RunningState = doc;
        }
    }

    const writefunc = async (tran, obj) => {
        const doc = obj.S_RunningState;
        if (doc) {
            const nextTime = dayjs().add(60, 'minute').startOf('hour');
            //tran.update(doc.ref, { nextTime: Timestamp.fromDate(nextTime.toDate()) });
        }
    }

    return await fireStoreManager.transaction([getfunc], [writefunc]);
}

await main();