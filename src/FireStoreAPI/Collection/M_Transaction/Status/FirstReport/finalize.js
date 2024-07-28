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

/**
 * FirstCallを展開
 * @param {DocumentSnapshot} mtranDoc
 * @param {DocumentSnapshot} dtranDoc
 * @param {DocumentSnapshot} accountDoc
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function finalize(mtranDoc, dtranDoc, accountDoc) {
    const limit = 500;

    // それぞれのD_Requestに展開する
    // mtranからリクエストを持ってきて、dtranのアカウントで展開
    const dtran = dtranDoc.data();
    const mtran = mtranDoc.data();
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
    logger.info(`[ファイナライズ開始][ステータス(FIRSTREPORT)][${mtran.tag}]`);
    // D_BatchReportRequestを削除
    const docs = await firestoreManager.getDocs("D_BatchReportRequest", [["transactionRefs", "array-contains", dtranDoc.ref]]);
    const stateRef = docs[0].data().ref;
    for await (const chunk of chunk(docs, limit)) {
        const batch = firestoreManager.createBatch();
        chunk.forEach(doc => batch.delete(doc));
        await firestoreManager.commitBatch(batch);
    }
    // M_Account.scheduleにregularCallを追加。
    const batch = await firestoreManager.createBatch();
    batch.update(accountDoc.ref, {schedules: ["regularCall"]});
    // S_RunningStateを削除
    batch.delete(stateRef);
    await firestoreManager.commitBatch(batch);
    logger.info(`[ファイナライズ終了][ステータス(FIRSTREPORT)][${mtran.tag}]`);
    return;
}