import { Firestore } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";
import { getQuery } from "./getDocs.js";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[any]} queries 
 * @param {any} func
 * @returns 
 */
export async function subscribe(db, collectionName, queries, func) {
    const query = await getQuery(db, collectionName, queries);

    return query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(func)
    }, (async e => {
        await L_ErrorManager.onFireStoreError(e, null);
        throw e;
    }));
}