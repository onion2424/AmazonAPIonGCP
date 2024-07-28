import { S_RunningState } from "./class.js";
import { Timestamp } from "firebase-admin/firestore";
/**
 * CREATE形式のjsonを受け取り、M_Accountを返す
 * @param {string} tag
 * @param {string} job
 * @param {[number]} hosts 
 * @returns 
 */
export function create(tag, job, hosts)
{
    const ret = structuredClone(S_RunningState);
    ret.tag = tag;
    ret.job = job;
    ret.hosts = hosts;
    ret.nextTime = Timestamp.now();
    ret.version = "1.0.0.0";
    return ret;
}