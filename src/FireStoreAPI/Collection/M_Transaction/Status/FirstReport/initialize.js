import { _, logger, dayjs } from "../../../../../Common/common.js";
import { M_Transaction } from "../../manager.js";
import { D_Transaction } from "../../../D_Transaction/manager.js";
import firestoreManager from "../../../../manager.js"
import collectionManager from "../../../manager.js"
import drequestManager, { D_ReportRequest } from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import { DocumentSnapshot } from "firebase-admin/firestore";
import { M_Account } from "../../../M_Account/manager.js";
import S_RunningStateManager from "../../../S_RunningState/manager.js";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
/**
 * FirstCallを展開
 * @param {FirebaseFirestore.WriteBatch} batch
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @param {DocumentSnapshot} accountDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function initialize(batch, mtranDoc, dtranDoc, accountDoc) {
    const limit = 500;
    const date = dayjs().startOf("minute");
    // それぞれのD_Requestに展開する
    // mtranからリクエストを持ってきて、dtranのアカウントで展開
    const dtran = dtranDoc.data();
    const mtran = mtranDoc.data();
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
    logger.info(`[初期化開始][ステータス(FIRSTREPORT)][${mtran.tag}]`);
    // まず削除
    const deleteDocs = await firestoreManager.getDocs("D_BatchReportRequest", [["transactionRefs", "array-contains", dtranDoc.ref]]);
    await firestoreManager.deleteDocs(deleteDocs);

    // ステータスに追加
    const states = await firestoreManager.getDocs("S_RunningState", [["job", "==", "BATCHRECEIVER"]]);
    let state = _.sortBy(states, [d => d.data().accountRefs.length || 0])[0];
    batch.update(state.ref, { accountRefs: FieldValue.arrayUnion(accountDoc.ref) });
    const allocation = drequestManager.allocation();
    /**
     * @type {Map<string, [D_ReportRequest]>}
     */
    const map = new Map();
    for (const requestInfo of mtran.requests) {
        const mrequestDoc = await collectionManager.get(requestInfo.ref);
        /**
         * @type {M_Request}
         */
        const mrequest = mrequestDoc.data();
        const detail = mrequest.details.find(d => d.refName == requestInfo.refName);
        const spans = getSpans(requestInfo.settings.dateback, dayjs(dtran.date.toDate()), dayjs(account.startDate));
        // その他のM_transactionからD_tranを作成
        // Refを持たせる
        const drequests = drequestManager.create(mrequestDoc, requestInfo.refName, accountDoc, [dtranDoc], dayjs(dtran.date.toDate()), spans);
        const path = mrequest.statuses[0].path;
        if(!map.has(path)) map.set(path, []);
        const arr = map.get(path);
        map.set(path, arr.concat(drequests));
        // for (const drequest of drequests.reverse()) {
        //     drequest.requestTime = Timestamp.fromDate(date.add(allocation(mrequest, drequest), "minute").toDate());
        // }
        logger.info(`[D_BatchReportRequest][${mrequest.tag}][${detail.tag}][${drequests.length}件]`);
    }
    // 時間を設定
    map.forEach((v, k, m) => {
        for(const drequest of v){
            drequest.requestTime = Timestamp.fromDate(date.add(allocation(k), "minute").toDate());
        }
    });
    // バッチ登録処理
    for (const key of map.keys()){
        for await (const chunk of _.chunk(map.get(key), limit)) {
            const b = await firestoreManager.createBatch();
            chunk.forEach(drequest => {
                const ref = firestoreManager.createRef(`D_BatchReportRequest`);
                b.set(ref, drequest);
            });
            await firestoreManager.commitBatch(b);
        }
    }

    logger.info(`[初期化終了][ステータス(FIRSTREPORT)][${mtran.tag}]`);
    return;
}

/**
 * 
 * @param {number} dateback 
 * @param {dayjs.Dayjs} basedate 
 * @param {dayjs.Dayjs} startdate 
 * @returns 
 */
function getSpans(dateback, basedate, startdate) {
    switch (dateback) {
        case -1:
            return [];
        case 0: {
            const diff = basedate.diff(startdate, 'day');
            return [...Array(diff)].map((_, i) => i + 1);
        }
        default: {
            if (startdate > basedate.add(-dateback, 'day')) {
                const diff = basedate.diff(startdate, 'day');
                return [...Array(diff)].map((_, i) => i + 1);
            }
            else {
                return [...Array(dateback)].map((_, i) => i + 1);
            }
        }
    }
}