/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("D_Token");
console.log('%o', reffer);
*/
import { _, utils, dayjs} from "../../../Common/systemCommon.js";
import { Timestamp } from "firebase-admin/firestore";

/**
 * 
 * @typedef {object} D_Token
 * @prop {Timestamp} expiration 有効期限
 * @prop {string} token トークン
 * @prop {delay} delay ディレイ
 */
/**
 * @type D_Token
 */
export const D_Token =
{
    expiration: null,

    token: "", 

    /**
     * @typedef {object} delay
     * @prop {number} count ディレイ回数
     * @prop {Timestamp} time リクエスト可能日時
     */
    delay: {
        count: 0,
        time: null,
    }
}
