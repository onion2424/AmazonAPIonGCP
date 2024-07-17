import firestoreManager from "../../manager.js"
import { _, dayjs } from "../../../Common/systemCommon.js";

export async function caching()
{
    return await firestoreManager.getDocs("M_Transaction");
}