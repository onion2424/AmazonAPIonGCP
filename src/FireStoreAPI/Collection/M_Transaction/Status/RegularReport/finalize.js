import { _, logger, dayjs } from "../../../../../Common/common.js";
import { M_Transaction } from "../../manager.js";
import { D_Transaction } from "../../../D_Transaction/manager.js";
import firestoreManager from "../../../../manager.js"
import collectionManager from "../../../manager.js"
import drequestManager, { D_ReportRequest } from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import { DocumentSnapshot, FieldValue } from "firebase-admin/firestore";
import { M_Account } from "../../../M_Account/manager.js";
import S_RunningStateManager from "../../../S_RunningState/manager.js";

/**
 * FirstCallを展開
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @param {DocumentSnapshot} accountDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function finalize(mtranDoc, dtranDoc, accountDoc) {
    // それぞれのD_Requestに展開する
    // mtranからリクエストを持ってきて、dtranのアカウントで展開
    const dtran = dtranDoc.data();
    const mtran = mtranDoc.data();
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
    logger.info(`[ファイナライズ開始][ステータス(REGULARREPORT)][${mtran.tag}]`);
    const batch = await firestoreManager.createBatch();
    const docs = await firestoreManager.getDocs("D_ReportRequest", [["transactionRefs", "array-contains", dtranDoc.ref]]);
    for(const doc of docs){
        batch.update(doc.ref, { transactionRefs: FieldValue.arrayRemove(dtranDoc.ref) });
    }

    //D_Scheduleを開放
    let doc = (await firestoreManager.getDocs("D_Schedule", [["accountRef", "==", accountDoc.ref], ["transactionRef", "==", mtranDoc.ref]]))[0];
    batch.update(doc.ref, { lock: false});

    await firestoreManager.commitBatch(batch);
    logger.info(`[ファイナライズ終了][ステータス(REGULARREPORT)][${mtran.tag}]`);
    return;
}