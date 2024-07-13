/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Account");
console.log('%o', reffer);
*/

/**
 * @typedef {object} M_Account
 * @prop {string} tag アカウント名称
 * @prop {string} sellerId セラーID
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
         * @prop {string} tokenId 関連するD_TokenのドキュメントID
         * @prop {string} client_id クライアントID
         * @prop {string} client_secret クライアントシークレット
         * @prop {string} profileId  プロフィールID
         */
        ads_token:
        {
            tokenId: "",
            client_id: "",
            client_secret: "",
            prifileId: "",
        },

        /**
         * @typedef {object} sp_token
         * @prop {string} tokenId 関連するD_TokenのドキュメントID
         * @prop {string} client_id クライアントID
         * @prop {string} client_secret クライアントシークレット
         * @prop {[string]} marketplaceIds マーケットプレイス
         */
        sp_token:
        {
            tokenId: "",
            client_id: "",
            client_secret: "",
            marketplaceIds: [],
        }
    },
    deleted: false,
    valid: true,
}