import { D_Transaction } from "./class.js";
import { M_Transaction } from "../M_Transaction/class.js";
import { _ } from "../../../Common/systemCommon.js";

/**
 * M_Scheduleを受け取り、D_Transactionを返す。
 * @param {M_Schedule} doc 
 * @returns 
 */
export function create(doc)
{   
    const ret = structuredClone(D_Transaction);
    ret.statuses = _.map(doc.statuses, (status) => status.status);
    ret.ref = doc.ref

    return ret;
}