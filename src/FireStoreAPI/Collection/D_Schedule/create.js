import { D_Schedule } from "./class.js";
import { dayjs } from "../../../Common/common.js";
import { Timestamp } from "firebase-admin/firestore";
/**
 * D_Scheduleを作成する
 * @param {dayjs.Dayjs} date 設定する日付 
 * @returns 
 */
export function create(accountDocRef, mtranDocRef, date)
{
    const ret = structuredClone(D_Schedule);
    ret.date = Timestamp.fromDate(date.toDate());
    ret.accountRef = accountDocRef;
    ret.transactionRef = mtranDocRef;

    return ret;
}