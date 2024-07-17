import { Firestore } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @returns 
 */
export function createRef(db, collectionName)
{
    return db.collection(collectionName).doc();
}