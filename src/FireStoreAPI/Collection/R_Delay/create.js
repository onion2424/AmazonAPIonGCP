import { R_Delay } from "./class.js";
import { DocumentReference, DocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { dayjs } from "../../../Common/common.js";

/**
 * R_Delay
 * @param {DocumentSnapshot} mtokenDoc
 * @returns 
 */
export function create(mtokenDoc)
{
    const ret = structuredClone(R_Delay);
    ret.ref = mtokenDoc.ref;
    ret.time = Timestamp.fromDate(dayjs().add(30, "second").toDate())
    ret.count = 1;
    return ret;
}