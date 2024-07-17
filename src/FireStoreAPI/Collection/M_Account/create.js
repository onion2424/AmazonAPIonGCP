import { M_Account } from "./class.js";

/**
 * CREATE形式のjsonを受け取り、M_Accountを返す
 * @param {*} json 
 * @returns 
 */
export function create(json, ref1, ref2)
{
    const ret = structuredClone(M_Account);
    ret.tag = json.tag;
    ret.sellerId = json.sellerId;
    ret.startDate = json.sellerStartDate;
    ret.token.ads_token = json.ads_token;
    ret.token.ads_token.ref = ref1;
    ret.token.sp_token = json.sp_token;
    ret.token.sp_token.ref = ref2;
    return ret;
}