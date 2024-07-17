/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Transaction");
console.log('%o', reffer);
*/

import { DocumentReference } from "firebase-admin/firestore";

/**
 * @typedef {object} M_Transaction
 * @prop {string} tag タグ
 * @prop {[detail]} details 詳細
 * @prop {[request]} requests リクエストIDs
 * @prop {boolean} valid 有効フラグ
 */

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

    /**
     * @typedef {object} detail
     * @prop {[status]} statuses 全ステータス
     * @prop {string} refName 参照名称
     */
    details: [
        {
            refName: "firstCall",
            statuses: [
                {
                    path: "",
                    collection: "",
                    status: "",
                }]
        },
        {
            refName: "regularCall",
            statuses: [
                {
                    path: "",
                    collection: "",
                    status: "",
                }]
        },
    ],

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