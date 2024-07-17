import firestoreManager from "../../manager.js"
import { M_Account } from './class.js';
import { _, dayjs } from "../../../Common/systemCommon.js";
import manager from "./manager.js"

export async function caching()
{
    return await firestoreManager.getDocs("M_Account");
}