import firestoreManager from "../../manager.js"

export async function caching()
{
    return await firestoreManager.getDocs("M_Error");
}