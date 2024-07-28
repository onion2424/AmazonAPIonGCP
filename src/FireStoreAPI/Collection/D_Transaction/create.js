import { D_Transaction } from "./class.js";
import { _, dayjs } from "../../../Common/common.js";
import { D_Schedule } from "../D_Schedule/class.js";
import { M_Transaction } from "../M_Transaction/class.js";
import { Timestamp } from "firebase-admin/firestore";
/**
 * M_Scheduleを受け取り、D_Transactionを返す。
 * @param {dayjs.Dayjs} date 
 * @returns 
 */
export function create(mtranDoc, accountDocRef, date)
{   
    const ret = structuredClone(D_Transaction);
    /**
     * @type {M_Transaction}
     */
    const data = mtranDoc.data();
    ret.transactionRef = mtranDoc.ref;
    ret.accountRef = accountDocRef;
    ret.statuses = data.statuses.map(r => r.status);
    ret.refName = data.refName;
    ret.date = Timestamp.fromDate(date.toDate());
    return ret;
}