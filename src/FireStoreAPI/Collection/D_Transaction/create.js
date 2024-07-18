import { D_Transaction } from "./class.js";
import { _ } from "../../../Common/common.js";
import { D_Schedule } from "../D_Schedule/class.js";
import { M_Transaction } from "../M_Transaction/class.js";

/**
 * M_Scheduleを受け取り、D_Transactionを返す。
 * @param {D_Schedule} dschedule 
 * @returns 
 */
export function create(dschedule, mtran, account)
{   
    const ret = structuredClone(D_Transaction);
    /**
     * @type {M_Transaction}
     */
    const data = mtran.data();
    ret.transactionRef= mtran.ref;
    ret.accountRef = account.ref;
    const regularCall = data.details.find(d => d.refName == "regularCall");
    ret.statuses = regularCall.statuses.map(r => r.status);
    ret.refName = regularCall.refName;
    ret.date = dschedule.date;

    return ret;
}