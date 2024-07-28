/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Transaction");
console.log('%o', reffer);
*/

import { DocumentReference } from "firebase-admin/firestore";

/**
 * @typedef {object} M_Transaction
 * @prop {string} tag タグ
 * @prop {[request]} requests リクエストIDs
 * @prop {boolean} valid 有効フラグ
 * @prop {string} refName 参照名称
 * @prop {[status]} statuses 全ステータス
 * 
 */

/**
 * @type {M_Transaction}
 */
export const M_Transaction = {
    tag: "",

    /**
     * @typedef {object} status
     * @prop {string} initialize イニシャライズ
     * @prop {string} finalize ファイナライズ
     * @prop {string} collection 監視対象のCollection - なければそのまま次のステータスへ
     * @prop {string} status ステータス
     */
    refName: "",
    statuses: [
        {
            initialize: "",
            finalize: "",
            collection: "",
            status: "",
        }],

    /**
     * @typedef {object} request
     * @prop {DocumentReference} ref リクエストID
     * @prop {string} refName 参照名称
     */
    requests:
    {
        ref: null,
        refName: "",
    },

    valid: true,
}