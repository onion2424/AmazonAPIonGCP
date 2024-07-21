import { Firestore, FieldPath } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[Array<string|FieldPath|any>]} queries 
 * @returns {number}
 */
export async function countDocs(db, collectionName, queries) {
    let collectionRef = db.collection(collectionName);

    const ret = [];

    if (queries)
        queries.forEach(query => {
            if (query[0] == "documentId") {
                query[0] = FieldPath.documentId();
            }
            collectionRef = collectionRef.where(...query);
        });

    const snapshot = await collectionRef.count().get()
    .catch(async e => {
        await L_ErrorManager.onFireStoreError(e, null);
        throw e;
    });
    return snapshot.data().count;
};