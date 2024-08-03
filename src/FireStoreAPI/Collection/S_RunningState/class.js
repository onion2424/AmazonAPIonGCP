/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("S_RunningState");
console.log('%o', reffer);
*/
import { dayjs } from "../../../Common/common.js"
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} S_RunningState
 * @prop {string} tag タグ
 * @prop {string} job ジョブ
 * @prop {[DocumentReference]} accountRefs 対象アカウントの参照
 * @prop {Timestamp} nextTime 次回実行時間
 */

/**
 * @type {S_RunningState}
 */
export const S_RunningState = {
    tag: "",
    job: "",
    accountRefs: [],
    nextTime: Timestamp.fromDate(dayjs().toDate()),
}