import { L_Error } from "./class.js";
import { Timestamp } from "firebase-admin/firestore";
import { dayjs } from "../../../Common/common.js";

/**
 * レスポンスのjsonを受け取り、D_Tokenを返す
 * @param {*} json 
 * @returns 
 */
export function create(job, error, doc)
{
    const ret = structuredClone(L_Error);
    ret.job = job;
    ret.error = error.message;
    if(doc) ret.snapshot = doc;
    ret.timestamp = Timestamp.fromDate(dayjs().toDate());
    return ret;
}