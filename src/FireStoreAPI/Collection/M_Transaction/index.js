import FirestoreManager from "../../manager.js"
import { M_Transaction } from './class.js';
import { M_Request } from "../M_Request/class.js";
import { _, dayjs, systemInfo } from "../../../Common/common.js";


const query = await FirestoreManager.getQuery("M_Request");

const snapshot = await query.get();

const requests = _.map(snapshot.docs, (doc) => {
    /**
     * @type {M_Request}
     */
    const data = doc.data();
    return { ref: doc.ref, refName: data.details[0].refName, tag: data.tag }
});

const spAdvertisedProduct = requests.find(r => r.tag == "スポンサープロダクト");
const sbCampaigns = requests.find(r => r.tag == "スポンサーブランド");
const sdAdvertisedProduct = requests.find(r => r.tag == "スポンサーディスプレイ");
const getSalesAndTrafficReport = requests.find(r => r.tag == "ビジネスレポート");
const getMerchantListingsAllData = requests.find(r => r.tag == "全ての出品商品のレポート");
const GetFbaMyiAllInventoryData = requests.find(r => r.tag == "FBA在庫管理");
const GetFlatFileAllOrdersDataByOrderDateGeneral = requests.find(r => r.tag == "全注文レポート");
{
    /**
     * @type {M_Transaction}
     */
    const data = {
        tag: 'ファーストリクエスト',
        refName: "firstCall",
        statuses:
            [
                {
                    status: "FIRSTREPORT",
                    collection: "D_BatchReportRequest",
                    initialize: "FireStoreAPI/Collection/M_Transaction/Status/FirstReport/initialize",
                    finalize: "FireStoreAPI/Collection/M_Transaction/Status/FirstReport/finalize",
                }
            ],
        requests: [
            { ref: spAdvertisedProduct.ref, refName: spAdvertisedProduct.refName, settings: { dateback: 60} },
            { ref: sbCampaigns.ref, refName: sbCampaigns.refName, settings: { dateback: 60 } },
            { ref: sdAdvertisedProduct.ref, refName: sdAdvertisedProduct.refName, settings: { dateback: 60 } },
            { ref: getSalesAndTrafficReport.ref, refName: getSalesAndTrafficReport.refName, settings: { dateback: 0 } },
            { ref: GetFlatFileAllOrdersDataByOrderDateGeneral.ref, refName: GetFlatFileAllOrdersDataByOrderDateGeneral.refName, settings: { dateback: 0 } },
        ],
        valid: true,
    }
    let docRef = await FirestoreManager.createRef("M_Transaction");
    const docs = await FirestoreManager.getDocs("M_Transaction", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
    await docRef.set(data);
}
{
    const data = {
        tag: '基本リクエスト',
        refName: "regularCall",
        statuses:
            [
                {
                    status: "REGULARREPORT",
                    collection: "D_ReportRequest",
                    initialize: "FireStoreAPI/Collection/M_Transaction/Status/RegularReport/initialize",
                    finalize: "FireStoreAPI/Collection/M_Transaction/Status/RegularReport/finalize",
                }
            ],
        schedulize: "FireStoreAPI/Collection/M_Transaction/Status/RegularReport/schedulize",
        requests: [
            { ref: spAdvertisedProduct.ref, refName: spAdvertisedProduct.refName, settings: { spans: systemInfo.isTest() ? [1] : [1, 2, 3, 4, 5, 6, 7, 30], granularity: "DAY"  }},
            { ref: sbCampaigns.ref, refName: sbCampaigns.refName, settings: { spans: systemInfo.isTest() ? [1] : [1, 2, 3, 4, 5, 6, 7, 30], granularity: "DAY"  }},
            { ref: sdAdvertisedProduct.ref, refName: sdAdvertisedProduct.refName, settings: { spans: systemInfo.isTest() ? [1] : [1, 2, 3, 4, 5, 6, 7, 30], granularity: "DAY"  }},
            { ref: getSalesAndTrafficReport.ref, refName: getSalesAndTrafficReport.refName, settings: { spans: systemInfo.isTest() ? [1] : [1, 2, 3, 4, 5, 6, 7, 30], granularity: "DAY"  }},
            { ref: getMerchantListingsAllData.ref, refName: getMerchantListingsAllData.refName, settings: { spans: systemInfo.isTest() ? [1] : [1], granularity: "DAY"  }},
            { ref: GetFbaMyiAllInventoryData.ref, refName: GetFbaMyiAllInventoryData.refName, settings: { spans: systemInfo.isTest() ? [1] : [1], granularity: "DAY"  }},
            { ref: GetFlatFileAllOrdersDataByOrderDateGeneral.ref, refName: GetFlatFileAllOrdersDataByOrderDateGeneral.refName, settings: { spans: systemInfo.isTest() ? [1] : [1, 2, 3, 4, 5, 6, 7, 30], granularity: "DAY"  }}
        ],
        valid: true,
    }
    let docRef = await FirestoreManager.createRef("M_Transaction");
    const docs = await FirestoreManager.getDocs("M_Transaction", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
    await docRef.set(data);
}
console.log("Success!")
// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction