import firestoreManager from "../../manager.js"
import { M_Request } from './class.js';
import { _, dayjs } from "../../../Common/systemCommon.js";
import manager from "./manager.js"

export async function caching()
{
    const docs = await firestoreManager.getDocs("M_Request");
    manager.cache = docs;
}