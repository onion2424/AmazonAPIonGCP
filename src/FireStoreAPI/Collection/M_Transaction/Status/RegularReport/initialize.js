import { _, logger, dayjs } from "../../../../../Common/systemCommon.js";
import { M_Transaction } from "../../manager.js";
import { D_Transaction } from "../../../D_Transaction/manager.js";
import firestoreManager from "../../../../manager.js"
import collectionManager from "../../../manager.js"
import drequestManager, { D_ReportRequest } from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import { DocumentSnapshot } from "firebase-admin/firestore";

/**
 * 
 * @param {FirebaseFirestore.WriteBatch} batch
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function initialize(batch, mtranDoc, dtranDoc) {
    const mtran = mtranDoc.data();
    const dtran = dtranDoc.data();
    const accountDoc = await collectionManager.get(dtran.accountRef);

    logger.info(`[初期化開始][ステータス(REGULARREPORT)][${accountDoc.data().tag}][${mtran.tag}]`);
    for (const requestInfo of mtran.requests){
        const requestDoc = await collectionManager.get(requestInfo.ref);
        const detail = requestDoc.data().details.find(d => d.refName == requestInfo.refName);
        // 日付設定からRegularCallを展開
        const dateSettings = detail.settings.date;
        const spans = dateSettings.spans;
        const drequests = drequestManager.create(requestDoc, requestInfo.refName, accountDoc, dtranDoc, dayjs(dtran.date.toDate()), spans)
        for (const drequest of drequests){
            const ref = await firestoreManager.createRef("D_ReportRequest");
            batch.set(ref, drequest);
        }
        logger.info(`[D_Request][${drequests.length}件]`);
    }
    logger.info(`[初期化終了][ステータス(REGULARREPORT)][${accountDoc.data().tag}][${mtran.tag}]`);
    return;
}