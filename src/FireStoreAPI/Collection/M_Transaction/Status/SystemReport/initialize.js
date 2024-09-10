import { _, logger, dayjs } from "../../../../../Common/common.js";
import { M_Transaction } from "../../manager.js";
import { D_Transaction } from "../../../D_Transaction/manager.js";
import firestoreManager from "../../../../manager.js"
import collectionManager from "../../../manager.js"
import drequestManager, { D_ReportRequest } from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import { DocumentSnapshot, Timestamp, FieldValue } from "firebase-admin/firestore";
import { M_Account } from "../../../M_Account/class.js";


/**
 * SystemCallを展開
 * @param {FirebaseFirestore.WriteBatch} batch
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @param {DocumentSnapshot} accountDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function initialize(batch, mtranDoc, dtranDoc, accountDoc) {
    const date = dayjs().add(1, "hour").startOf('hour');   

    const mtran = mtranDoc.data();
    const dtran = dtranDoc.data();
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
    // timezoneを考慮
    let diff = dayjs(dtran.date.toDate()).add(2, "hour").tz(account.timezone, true).diff(date, "minutes");
    // ↑が0なら2時だから、そのままでOK - ならもっとOK +ならそれ分minutesを+する
    const firstDate = diff > 0 ? date.add(diff, "minute") : date;
    const allocation = drequestManager.allocation();
    logger.info(`[初期化開始][ステータス(SYSTEMREPORT)][${mtran.tag}]`);
    for (const requestInfo of mtran.requests) {
        const mrequestDoc = await collectionManager.get(requestInfo.ref);
        const mrequest = mrequestDoc.data();
        const detail = mrequest.details.find(d => d.refName == requestInfo.refName);
        const spans = mergeSpans(requestInfo.settings.spans, dtran.spans);
        const granularity = requestInfo.settings.granularity;
        // その他のM_transactionからD_tranを作成
        // Refを持たせる
        const drequests = drequestManager.create(mrequestDoc, requestInfo.refName, accountDoc, [dtranDoc], dayjs(dtran.date.toDate()), spans, granularity);
        for (const drequest of drequests.reverse()) {
            drequest.requestTime = Timestamp.fromDate(firstDate.add(allocation(mrequest.statuses.find(s => s.status == drequest.status).path), "minute").toDate());
            const ref = firestoreManager.createRef("D_ReportRequest");
            batch.set(ref, drequest);
        }
        logger.info(`[D_ReportRequest][${mrequest.tag}][${detail.tag}][${drequests.length}件]`);
    }
    logger.info(`[初期化終了][ステータス(SYSTEMREPORT)][${mtran.tag}]`);
    return;
}

/**
 * 
 * @param {[number]} reportSpans 
 * @param {[number]} tranSpans 
 */
function mergeSpans(reportSpans, tranSpans){
    let ret = [];
    for(const tranSpan of tranSpans){
        ret = [...ret, ...reportSpans.map(s => s + tranSpan)];
    }
    return _.sortBy(Array.from(new Set(ret)));
}