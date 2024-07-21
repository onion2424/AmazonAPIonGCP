/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Account");
console.log('%o', reffer);
*/
import { Timestamp, DocumentReference } from "firebase-admin/firestore";

/**
 * @typedef {object} M_Account
 * @prop {string} tag アカウント名称
 * @prop {string} sellerId セラーID
 * @prop {Timestamp} startDate 開始日
 * @prop {token} token トークン
 * @prop {boolean} deleted 削除フラグ
 * @prop {boolean} valid 有効フラグ
 */

/**
 * @type {M_Account}
 */
export const M_Account = {
    tag: "",
    sellerId: "",
    /**
     * @typedef {object} token
     * @prop {ads_token} ads_token ADS-APIのトークン
     * @prop {sp_token} sp_token SP-APIのトークン
     */
    token: {
        /**
         * @typedef {object} ads_token
         * @prop {DocumentReference} ref 関連するD_Tokenのリファレンス
         * @prop {string} client_id クライアントID
         * @prop {string} client_secret クライアントシークレット
         * @prop {string} refresh_token リフレッシュトークン
         * @prop {string} profileId  プロフィールID
         */
        ads_token:
        {
            ref: null,
            client_id: "",
            client_secret: "",
            refresh_token: "",
            profileId: "",
        },

        /**
         * @typedef {object} sp_token
         * @prop {DocumentReference} ref 関連するD_Tokenのリファレンス
         * @prop {string} client_id クライアントID
         * @prop {string} client_secret クライアントシークレット
         * @prop {string} refresh_token リフレッシュトークン
         * @prop {[string]} marketplaceIds マーケットプレイス
         */
        sp_token:
        {
            ref: null,
            client_id: "",
            client_secret: "",
            refresh_token: "",
            marketplaceIds: [],
        }
    },
    deleted: false,
    valid: true,
}