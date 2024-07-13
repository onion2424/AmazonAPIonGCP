import { Firestore, FieldPath } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[Array<string|FieldPath|any>]} queries 
 * @param {number} limit
 * @returns {FirebaseFirestore.Query<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>}
 */
export async function getDocsRef(db, collectionName, queries, limit) {
    let collectionRef = db.collection(collectionName);

    if (!queries) {
        throw new Error;
    }

    /**
     * @type {FirebaseFirestore.Query<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>}
     */
    let ret = collectionRef;

    queries.forEach(query => {
        if (query[0] == "documentId") {
            query[0] = FieldPath.documentId();
        }
        ret = ret.where(...query);
    });

    if (limit) {
        ret = ret.limit(limit);
    }

    return ret;
};