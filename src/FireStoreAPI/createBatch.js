import { Firestore } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";

/**
 * 
 * @param {Firestore} db 
 * @returns 
 */
export function createBatch(db) {
    return db.batch();
}

/**
 * 
 * @param {FirebaseFirestore.WriteBatch} batch 
 */
export async function commitBatch(batch) {
    return batch.commit()
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}