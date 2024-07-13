import { M_Account } from "./class.js";

/**
 * CREATE形式のjsonを受け取り、M_Accountを返す
 * @param {*} json 
 * @returns 
 */
export function create(json)
{
    const ret = structuredClone(M_Account);
    ret.tag = json.tag;
    ret.sellerId = json.sellerId;
    ret.token.ads_token = json.ads_token;
    ret.token.sp_token = json.sp_token;

    return ret;
}