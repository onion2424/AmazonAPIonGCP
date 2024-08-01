/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("D_Token");
console.log('%o', reffer);
*/
import { _, utils, dayjs} from "../../../Common/common.js";
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * 
 * @typedef {object} L_Error
 * @prop {string} job ジョブ
 * @prop {string} version バージョン
 * @prop {string} error エラー内容
 * @prop {string} snapshot スナップショット
 * @prop {Timestamp} timestamp タイムスタンプ
 */
/**
 * @type L_Error
 */
export const L_Error =
{
    job: "",
    version: "",
    error: "",
    snapshot: "",
    timestamp: null,
}
