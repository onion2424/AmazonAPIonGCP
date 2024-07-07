import { Firestore, FieldPath } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[Array<string|FieldPath>]} queries 
 * @returns 
 */
export async function getDocs(db, collectionName, queries) {
    const collectionRef = db.collection(collectionName);
    let ret = collectionRef;
    queries.forEach(query => {
        if (query[0] == "documentId") {
            query[0] = FieldPath.documentId();
        }
        ret.where(...query);
    });
    return ret;
};