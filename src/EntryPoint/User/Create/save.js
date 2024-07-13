import { _, utils, dayjs } from "../../../Common/systemCommon.js";
import root from "../../../import.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import M_AccountManager from "../../../FireStoreAPI/Collection/M_Account/manager.js"
import D_TokenManager from "../../../FireStoreAPI/Collection/D_Token/manager.js"
import D_ReportRequestManager from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import D_TransactionManager from "../../../FireStoreAPI/Collection/D_Transaction/manager.js"
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/class.js';
import { D_Transaction } from '../../../FireStoreAPI/Collection/D_Transaction/class.js';
import { M_Transaction } from '../../../FireStoreAPI/Collection/M_Transaction/class.js';

export default async function save(json) {
    const date = dayjs();

    const batch = await fireStoreManager.createBatch();

    const adsDocRef = await fireStoreManager.createDoc("D_Token");
    batch.set(adsDocRef, D_TokenManager.create(json['ads_token'].accessToken));
    delete json.ads_token.accessToken;

    const spDocRef = await fireStoreManager.createDoc("D_Token");
    batch.set(spDocRef, D_TokenManager.create(json['sp_token'].accessToken));
    delete json.sp_token.accessToken;

    const accountDocRef = await fireStoreManager.createDoc("M_Account");
    const account = M_AccountManager.create(json, adsDocRef.id, spDocRef.id);
    batch.set(accountDocRef, account);

    const mtrans = await fireStoreManager.getDocs("M_Transaction", [["valid", "==", true]]);
    for (const mtran of mtrans) {
        const transactionDoc = await fireStoreManager.createDoc("D_Transaction");
        // 初期データ取得用のD_Tranを作成
        {
            // M_TransactionからD_Transactionを作成する。statusesはReport⇒FirstCall。これだけ？
            // firstCallStatusesをM_Transactionに持たせないといけない

            const dtran = structuredClone(D_Transaction);
            /**
             * @type {M_Transaction}
             */
            const mtranData = mtran.data();
            dtran.ref = mtran.ref;
            dtran.statuses = mtranData.firstStatuses.map(s => s.status);
            dtran.status = "";
            batch.set(transactionDoc, dtran);
        }
    }

    await batch.commit();
    return true;
}

/**
 * 
 * @param {number} dateback 
 * @param {dayjs.Dayjs} basedate 
 * @param {dayjs.Dayjs} startdate 
 * @returns 
 */
function getSpans(dateback, basedate, startdate) {
    switch (dateback) {
        case -1:
            return [];
        case 0: {
            const diff = basedate.diff(startdate, 'day');
            return [...Array(diff)].map((_, i) => i + 1);
        }
        default: {
            return [...Array(dateback)].map((_, i) => i + 1);
        }
    }
}
