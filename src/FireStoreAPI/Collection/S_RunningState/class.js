/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("S_RunningState");
console.log('%o', reffer);
*/
import { dayjs } from "../../../Common/common.js"
import { Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} S_RunningState
 * @prop {string} tag タグ
 * @prop {string} job ジョブ
 * @prop {[number]} hosts ホストのリスト
 * @prop {Timestamp} nextTime 次回実行時間
 */

/**
 * @type {S_RunningState}
 */
export const S_RunningState = {
    tag: "",
    job: "",
    hosts: [],
    nextTime: Timestamp.fromDate(dayjs().toDate()),
}