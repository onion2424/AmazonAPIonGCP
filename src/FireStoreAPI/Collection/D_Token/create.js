import { D_Token } from "./class.js";
import { Timestamp } from "firebase-admin/firestore";
import { dayjs } from "../../../Common/systemCommon.js";

/**
 * tokenInfo形式のjsonを受け取り、D_Tokenを返す
 * @param {*} json 
 * @returns 
 */
export function create(tokenInfo)
{
    const ret = structuredClone(D_Token);
    ret.token = tokenInfo.access_token;
    ret.expiration = Timestamp.fromDate(dayjs().add(tokenInfo.expires_in, 'seconds').toDate());

    return ret;
}