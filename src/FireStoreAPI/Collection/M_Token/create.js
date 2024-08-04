import { M_Token } from "./class.js";
import { Timestamp } from "firebase-admin/firestore";
import { dayjs } from "../../../Common/common.js";

/**
 * レスポンスのjsonを受け取り、D_Tokenを返す
 * @param {*} json 
 * @returns 
 */
export function create(tokenInfo)
{
    const ret = structuredClone(M_Token);
    ret.token = tokenInfo.access_token;
    ret.expiration = Timestamp.fromDate(dayjs().add(tokenInfo.expires_in, 'seconds').add(-5, "minute").toDate());
    return ret;
}