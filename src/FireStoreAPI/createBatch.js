import { Firestore } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @returns 
 */
export function createBatch(db)
{
    return db.batch();
}