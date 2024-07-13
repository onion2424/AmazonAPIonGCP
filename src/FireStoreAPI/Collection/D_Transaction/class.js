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
 * @prop {DocumentReference} ref M_Transactionのref
 * @prop {Timestamp} date 対象日時
 */

/**
 * @type {D_Transaction}
 */
export const D_Transaction = {
    status: "",
    statuses:[],
    ref: null,
    date: null,
}




/**
 * @type {M_Transaction}
 */
export const M_Transaction = {
    tag: "",

    /**
     * @typedef {object} status
     * @prop {string} path パス
     * @prop {string} collection 監視対象のCollection - なければそのまま次のステータスへ
     * @prop {string} status ステータス
     */
    statuses:
    {
        path: "",
        collection: "",
        status: "",
    },

    valid: true,
}