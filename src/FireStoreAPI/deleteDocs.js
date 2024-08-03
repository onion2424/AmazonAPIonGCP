import { _ } from "../Common/common.js";
import firestoreManager from "./manager.js"
import { Firestore } from "firebase-admin/firestore";


/**
 * 
 * @param {[FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>]} docs 
 */
export async function deleteDocs(docs) {
    const limit = 500;
    for await (const chunk of _.chunk(docs, limit)) {
        const batch = await firestoreManager.createBatch();
        chunk.forEach(doc => batch.delete(doc.ref));
        await firestoreManager.commitBatch(batch);
    }
}