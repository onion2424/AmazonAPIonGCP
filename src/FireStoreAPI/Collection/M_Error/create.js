import { M_Error } from "./class.js";
import { Timestamp } from "firebase-admin/firestore";
import { dayjs } from "../../../Common/common.js";

/**
 * レスポンスのjsonを受け取り、D_Tokenを返す
 * @param {*} json 
 * @returns 
 */
export function create(path, status, response)
{
    const ret = structuredClone(M_Error);
    ret.equal = "FireStoreAPI/Collection/M_Error/Equal/structureEqual";
    ret.handle = "FireStoreAPI/Collection/M_Error/Handle/skipOnce";
    ret.path = path;
    ret.status = status;
    ret.response = response;
    ret.tag = "タグなし";
    return ret;
}