import firestoreManager from "../../manager.js"
import { _, dayjs } from "../../../Common/systemCommon.js";
import manager from "./manager.js"

export async function caching()
{
    const docs = await firestoreManager.getDocs("M_Transaction");
    manager.cache = docs;
}