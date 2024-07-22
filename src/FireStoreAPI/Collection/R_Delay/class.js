/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Transaction");
console.log('%o', reffer);
*/

import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} R_Delay
 * @prop {DocumentReference} ref M_Tokenのリファレンス
 * @prop {Timestamp} time ディレイ時間
 * @prop {number} count ディレイ回数
 */

/**
 * @type {R_Delay}
 */
export const R_Delay = {
    ref: null,
    time: null,
    count: 0,
}