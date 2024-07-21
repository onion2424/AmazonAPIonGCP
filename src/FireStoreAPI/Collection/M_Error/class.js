/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("D_Token");
console.log('%o', reffer);
*/
import { _, utils, dayjs} from "../../../Common/common.js";
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * 
 * @typedef {object} M_Error
 * @prop {string} equal 同一判定パス
 * @prop {string} handle ハンドルパス
 * @prop {DocumentReference} ref リファレンス
 * @prop {string} path 対象のパス(メソッド)
 * @prop {string} tag
 * @prop {string} response レスポンス
 * @prop {number} status ステータス
 */
/**
 * @type M_Error
 */
export const M_Error =
{
    equal: "",
    handle: "",
    path: "",
    tag: "",
    response: "",
    status: 0,
}
