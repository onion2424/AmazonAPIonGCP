import { _, logger, dayjs } from "../../../../../Common/common.js";
import { M_Transaction } from "../../manager.js";
import { D_Transaction } from "../../../D_Transaction/manager.js";
import firestoreManager from "../../../../manager.js"
import collectionManager from "../../../manager.js"
import drequestManager, { D_ReportRequest } from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import { DocumentSnapshot } from "firebase-admin/firestore";

/**
 * FirstCallを展開
 * @param {FirebaseFirestore.WriteBatch} batch
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function initialize(batch, mtranDoc, dtranDoc) {
    // それぞれのD_Requestに展開する
    // mtranからリクエストを持ってきて、dtranのアカウントで展開
    const dtran = dtranDoc.data();
    const mtran = mtranDoc.data();
    const accountDoc = await collectionManager.get(dtran.accountRef);
    logger.info(`[初期化開始][ステータス(FIRSTREPORT)][${accountDoc.data().tag}][${mtran.tag}]`);
    for (const requestInfo of mtran.requests){
        const mrequestDoc = await collectionManager.get(requestInfo.ref);
        /**
         * @type {M_Request}
         */
        const mrequest = mrequestDoc.data();
        const detail = mrequest.details.find(d => d.refName == requestInfo.refName);
        const dateSettings = detail.settings.date;
        const spans = getSpans(dateSettings.dateback, dayjs(dtran.date.toDate()), dayjs(accountDoc.data().startDate));
        // その他のM_transactionからD_tranを作成
        // Refを持たせる
        const drequests = drequestManager.create(mrequestDoc, requestInfo.refName, accountDoc, [dtranDoc], dayjs(dtran.date.toDate()), spans)
        for (const drequest of drequests){
            const ref = await firestoreManager.createRef("D_ReportRequest");
            batch.set(ref, drequest);
        }
        logger.info(`[D_ReportRequest][${mrequest.tag}][${detail.tag}][${drequests.length}件]`);
    }
    logger.info(`[初期化終了][ステータス(FIRSTREPORT)][${accountDoc.data().tag}][${mtran.tag}]`);
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
            if(startdate > basedate.add(-dateback, 'day')){
                const diff = basedate.diff(startdate, 'day');
                return [...Array(diff)].map((_, i) => i + 1);
            }
            else            {
                return [...Array(dateback)].map((_, i) => i + 1);
            }
        }
    }
}