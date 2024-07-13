import FirestoreManager from "../../manager.js"
import { M_Transaction } from './class.js';
import { M_Request } from "../M_Request/class.js";
import { _, dayjs } from "../../../Common/systemCommon.js";


const query = await FirestoreManager.getQuery("M_Request");

const snapshot = await query.get();

const requests = _.map(snapshot.docs, (doc) => {
    const data = doc.data();
    return { ref: doc.ref, refName: data.details[0].refName }
});

let docRef = await FirestoreManager.createDoc("M_Transaction");

// テスト中はとりあえずもってこればいい。

/**
 * @type {M_Transaction}
 */
let data = {
    tag: 'マージ用レポート受信',
    regularStatuses: [
        {
            status: "RECEIVE",
            collection: "D_ReportRequest",
            path: "FireStoreAPI/Collection/M_Transaction/Status/receive",
        }
    ], // ここからpathは取得する(D_Transactionでは[string]にする) + transactionIDを持たせる
    firstStatuses: [
        {
            status: "FIRSTRECEIVE",
            collection: "D_ReportRequest",
            path: "FireStoreAPI/Collection/M_Transaction/Status/firstReceive",
        }
    ],
    requests: requests,
    valid: true,
}
await docRef.set(data);

console.log("Success!")
// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction