import { Firestore } from "firebase-admin/firestore";
import L_ErrorManager from "./Collection/L_Error/manager.js";

/**
 * 
 * @param {Firestore} db 
 * @param {[(transaction: FirebaseFirestore.Transaction, obj: object) => Promise<void>]} getFunctions
 * @param {[(transaction: FirebaseFirestore.Transaction, obj: object) => Promise<void>]} writeFunctions
 * @returns object
 */
export async function transaction(db, getFunctions, writeFunctions) {
    const obj = {};
    await db.runTransaction(async (tran) => {
        for await (const func of getFunctions) {
            // get処理のみ先に行う仕組み
            await func(tran, obj);
        }
        for await (const func of writeFunctions) {
            await func(tran, obj);
        }
    }).catch(async e => {
        await L_ErrorManager.onFireStoreError(e, null);
        throw e;
    });
    return obj;
}