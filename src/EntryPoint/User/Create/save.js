import { _, utils, dayjs, logger } from "../../../Common/common.js";
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import M_AccountManager from "../../../FireStoreAPI/Collection/M_Account/manager.js"
import M_TokenManager from "../../../FireStoreAPI/Collection/M_Token/manager.js"
import D_TransactionManager, { D_Transaction } from '../../../FireStoreAPI/Collection/D_Transaction/manager.js';
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import { M_Transaction } from '../../../FireStoreAPI/Collection/M_Transaction/class.js';
import { Timestamp } from "firebase-admin/firestore";
import bigQueryManager from "../../../BigQueryAPI/manager.js"
import { M_Request } from "../../../FireStoreAPI/Collection/M_Request/manager.js";

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
    for (const mtranDoc of mtrans) {
        const transactionDocRef = await fireStoreManager.createRef("D_Transaction");
        // 初期データ取得用のD_Tranを作成
        {
            /**
             * @type {M_Transaction}
             */
            const mtranData = mtranDoc.data();
            const firstCall = mtranData.details.find(d => d.refName == "firstCall");
            if(!firstCall) continue;
            for await(const request of mtranData.requests){
                const mrequestDoc = await collectionManager.get(request.ref);
                /**
                 * @type {M_Request}
                 */
                const mrequest = mrequestDoc.data();
                const detail = mrequest.details.find(d => d.refName == request.refName);
                if(detail.schema && detail.schema.length > 0){
                    const options = {
                        schema: detail.schema,
                        timePartitioning: {
                            type: 'DAY',
                            field: 'partition_date',
                        },
                        clustering: {
                            fields: ['cluster_asin'],
                        },
                    };
                    await bigQueryManager.createPartitionTable(detail.settings.save.tableName, account.tag, options);
                }
            }
            batch.set(transactionDocRef, D_TransactionManager.create(mtranDoc, accountDocRef, "firstCall", date));
        }
    }

    await batch.commit();

    logger.info("[セーブ完了]");

    return true;
}