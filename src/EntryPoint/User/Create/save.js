import { getFirestore, FieldValue, Transaction, Timestamp, DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore';
import { _, utils } from "../../../Common/systemCommon.js";
import root from "../../../import.js"
import { manager as FireStoreAPI } from "../../../FireStoreAPI/manager.js"

export default async function save(json) {
    /**
     * @type {FireStoreAPI}
     */
    const fireStoreManager = _.get(root, ["FireStoreAPI"]);
    const batch = await fireStoreManager.createBatch();
    console.log(_.get(json, ['ADS-API']));
    const adsDocRef = fireStoreManager.createDoc("D_Token");
    batch.set(adsDocRef, D_Token(json['ADS-API'].tokenInfo));
    const spDocRef = fireStoreManager.createDoc("D_Token");
    batch.set(spDocRef, D_Token(json['SP-API'].tokenInfo));
    const accountDocRef = fireStoreManager.createDoc("M_Account");
    batch.set(accountDocRef, M_Acount(json, adsDocRef.id, spDocRef.id));
    batch.commit();
    return true;
}

// transaction貼らないと無意味か？
function M_Acount(json, adsToken, spToken) {
    const ads = json["ADS-API"];
    const sp = json["SP-API"];
    let document =
    {
        deleted: false,
        tag: json.name,
        token:
        {
            ads: {
                client_id: ads.client_id,
                client_secret: ads.client_secret,
                profileId: ads.profileId,
                tokenId: adsToken,
            },
            sp: {
                client_id: sp.client_id,
                client_secret: sp.client_secret,
                marketplaceIds: json.marketplaceIds,
                tokenId: spToken,
            }
        }
    };
    return document;
}

function D_Token(accessToken) {
    let date = new Date();
    date.setSeconds(date.getSeconds() + accessToken["expires_in"]);

    let document =
    {
        delayInfo:
        {
            delayCount: 0,
            delayTime: Timestamp.fromDate(new Date())
        },
        expiration: Timestamp.fromDate(date),
        token: accessToken.access_token,
        valid: true,
    }

    return document;
}

function D_Transaction() {

}


function D_ReportRequest() {
    // 全部とれるだけとる(一昨日まで)
    // M_Requestを全聚徳
}

// これは自動にする
function M_Schedule() {

}