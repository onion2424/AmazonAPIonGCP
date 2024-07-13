import { Firestore } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @param {[(transaction: FirebaseFirestore.Transaction, obj: object) => Promise<void>]} functions
 * @returns 
 */
export function transaction(db, functions) {
    const obj = {};
    return db.runTransaction(async (tran) => {
        for await (const func of functions) {
            // get処理のみ先に行う仕組みを考える
            // jsonのproperty: getメソッドの形にしてobjで引き渡す等。
            await func(tran, obj);
        }
    });
}