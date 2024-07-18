import { Firestore } from "firebase-admin/firestore";

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
    });
    return obj;
}