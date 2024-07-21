import { Firestore } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @returns 
 */
export function createRef(db, collectionName) {
    return db.collection(collectionName).doc();
}

/**
 * 
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} doc 
 * @param {*} data
 */
export async function setRef(doc, data) {
    return doc.set(data)
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}

/**
 * 
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} doc 
 * @param {*} data
 */
export async function updateRef(doc, data) {
    return doc.update(data)
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}