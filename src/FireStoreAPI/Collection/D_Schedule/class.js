/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Account");
console.log('%o', reffer);
*/

import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} D_Schedule
 * @prop {Timestamp} date スケジュール日付
 * @prop {DocumentReference} accountRef M_Accountのリファレンス
 * @prop {DocumentReference} transactionRef M_Transactionのリファレンス
 */

/**
 * @type {D_Schedule}
 */
export const D_Schedule = {
    date: null,
    accountRef: null,
    transactionRef: null,
    lock: false,
}