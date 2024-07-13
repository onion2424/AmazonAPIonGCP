/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Transaction");
console.log('%o', reffer);
*/

/**
 * @typedef {object} M_Transaction
 * @prop {string} tag タグ
 * @prop {[status]} regularStatuses 全ステータス(通常時)
 * @prop {[status]} firstStatuses 全ステータス(初回時)
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
    regularStatuses:
    {
        path: "",
        collection: "",
        status: "",
    },

    /**
     * @typedef {object} status
     * @prop {string} path パス
     * @prop {string} collection 監視対象のCollection - なければそのまま次のステータスへ
     * @prop {string} status ステータス
     */
    firstStatuses:
    {
        path: "",
        collection: "",
        status: "",
    },

    /**
     * @typedef {object} request
     * @prop {string} id リクエストID
     * @prop {string} refName 参照名称
     */
    requests:
    {
        id: "",
        refName: "",
    },

    valid: true,
}