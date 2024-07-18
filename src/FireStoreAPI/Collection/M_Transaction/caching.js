import firestoreManager from "../../manager.js"
import { _, dayjs } from "../../../Common/common.js";

export async function caching()
{
    return await firestoreManager.getDocs("M_Transaction");
}