import FirestoreManager from "../../manager.js"
import { M_Transaction } from './class.js';
import { M_Request } from "../M_Request/class.js";
import { _, dayjs } from "../../../Common/common.js";


const query = await FirestoreManager.getQuery("M_Request");

const snapshot = await query.get();

const requests = _.map(snapshot.docs, (doc) => {
    const data = doc.data();
    return { ref: doc.ref, refName: data.details[0].refName }
});


// テスト中はとりあえずもってこればいい。

/**
 * @type {M_Transaction}
 */
let data = {
    tag: 'ファーストリクエスト',
    refName: "firstCall",
    statuses:
        [
            {
                status: "FIRSTREPORT",
                collection: "D_ReportRequest",
                initialize: "FireStoreAPI/Collection/M_Transaction/Status/FirstReport/initialize",
                finalize: "",
            }
        ],
    requests: requests,
    valid: true,
}
let ref = await FirestoreManager.createRef("M_Transaction");
await ref.set(data);

data = {
    tag: '基本リクエスト',
    refName: "regularCall",
    statuses: 
    [
        {
            status: "REGULARREPORT",
            collection: "D_ReportRequest",
            initialize: "FireStoreAPI/Collection/M_Transaction/Status/RegularReport/initialize",
            finalize: "",
        }
    ],
    requests: requests,
    valid: true,
}

ref = await FirestoreManager.createRef("M_Transaction");
await ref.set(data);

console.log("Success!")
// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction