/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("S_RunningState");
console.log('%o', reffer);
*/
import { dayjs } from "../../../Common/systemCommon.js"
import { Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} S_RunningState
 * @prop {string} tag タグ
 * @prop {string} job ジョブ
 * @prop {[number]} hosts
 * @prop {Timestamp} nextTime 次回実行時間
 * @prop {string} version バージョン
 */

/**
 * @type {S_RunningState}
 */
export const S_RunningState = {
    tag: "",
    job: "",
    hosts: [],
    nextTime: Timestamp.fromMillis(dayjs()),
    version: "",
}