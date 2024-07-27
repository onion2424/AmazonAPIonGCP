import { Firestore, FieldPath, Filter, Query } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @returns {any}
 */
export async function recursiveDelete(db, collectionName) {
    let collectionRef = db.collection(collectionName);

    db.recursiveDelete(collectionRef)
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
};
