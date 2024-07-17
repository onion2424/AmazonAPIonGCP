/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Transaction");
console.log('%o', reffer);
*/

import { Timestamp, DocumentReference } from "firebase-admin/firestore";

/**
 * @typedef {object} D_Transaction
 * @prop {string} status ステータス
 * @prop {[status]} statuses 全ステータス
 * @prop {string} refName 参照名称
 * @prop {DocumentReference} transactionRef M_Transactionのref
 * @prop {DocumentReference} accountRef M_Accountのref
 * @prop {Timestamp} date 対象日時
 */

/**
 * @type {D_Transaction}
 */
export const D_Transaction = {
    status: "",
    statuses:[],
    refName: "",
    transactionRef: null,
    accountRef: null,
    date: null,
}