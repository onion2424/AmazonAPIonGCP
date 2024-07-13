import { _ } from "../../../../../Common/systemCommon.js";
import { M_Transaction } from "../../class.js";
import { D_Transaction } from "../../../D_Transaction/class.js";
import firestoreManager from "../../../../manager.js"
import mtranManager from "../../manager.js"
import drequestManager from "../../../D_ReportRequest/manager.js"
import mrequestManager, { M_Request } from "../../../M_Request/manager.js"
import maccountManager from "../../../M_Account/manager.js"

/**
 * 
 * @param {FirebaseFirestore.WriteBatch} batch
 * @param {M_Transaction} mtran 
 * @param {D_Transaction} dtran
 * @returns {FirebaseFirestore.WriteBatch}
 */
export async function initialize(batch, mtran, dtran) {
    for await (const account of maccountManager.cash) {
        // アカウント毎
        for await (const request of mtran.requests) {
            /**
             * @type {M_Request}
             */
            const mrequest = mrequestManager.cash.find(r => r.documentId == request.id);
            if (mrequest.valid) {
                for await(const detail of mrequest.details){
                // D_ReportRequestに展開
                //batch.create(await firestoreManager.createDoc("D_ReportRequest"), drequestManager.create(mrequest, detail.refName, account, ));
                }
            }
        }
    }


    // それぞれのD_Requestに展開する
    return;
}