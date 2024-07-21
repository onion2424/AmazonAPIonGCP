import { _, utils, dayjs, logger } from "../../../Common/common.js";
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import M_AccountManager from "../../../FireStoreAPI/Collection/M_Account/manager.js"
import M_TokenManager from "../../../FireStoreAPI/Collection/M_Token/manager.js"
import { D_Transaction } from '../../../FireStoreAPI/Collection/D_Transaction/class.js';
import { M_Transaction } from '../../../FireStoreAPI/Collection/M_Transaction/class.js';
import { Timestamp } from "firebase-admin/firestore";

export default async function save(json) {
    const date = dayjs().startOf("day");
    const batch = await fireStoreManager.createBatch();

    const adsDocRef = await fireStoreManager.createRef("M_Token");
    batch.set(adsDocRef, M_TokenManager.create(json['ads_token'].accessToken));
    delete json.ads_token.accessToken;

    const spDocRef = await fireStoreManager.createRef("M_Token");
    batch.set(spDocRef, M_TokenManager.create(json['sp_token'].accessToken));
    delete json.sp_token.accessToken;

    const accountDocRef = await fireStoreManager.createRef("M_Account");
    const account = M_AccountManager.create(json, adsDocRef, spDocRef);
    batch.set(accountDocRef, account);

    const mtrans = await fireStoreManager.getDocs("M_Transaction", [["valid", "==", true]]);
    for (const mtran of mtrans) {
        const transactionDoc = await fireStoreManager.createRef("D_Transaction");
        // 初期データ取得用のD_Tranを作成
        {
            // いったん無理やり作成
            const dtran = structuredClone(D_Transaction);
            /**
             * @type {M_Transaction}
             */
            const mtranData = mtran.data();
            const firstCall = mtranData.details.find(d => d.refName == "firstCall");
            if(!firstCall) continue;
            dtran.transactionRef = mtran.ref;
            dtran.accountRef = accountDocRef;
            dtran.statuses = firstCall.statuses.map(s => s.status);
            dtran.refName = firstCall.refName;
            dtran.status = "";
            dtran.date = Timestamp.fromDate(date.toDate());
            batch.set(transactionDoc, dtran);
        }
    }

    await batch.commit();

    logger.info("[セーブ完了]");

    return true;
}