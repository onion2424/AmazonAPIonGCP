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
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
 * @param {*} data
 */
export async function setRef(ref, data) {
    return ref.set(data)
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}


/**
 * 
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
 * @param {*} data
 */
export async function updateRef(ref, data) {
    return ref.update(data)
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}

/**
 * 
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
 */
export async function deleteRef(ref) {
    return ref.delete()
        .catch(async e => {
            await L_ErrorManager.onFireStoreError(e, null);
            throw e;
        });
}