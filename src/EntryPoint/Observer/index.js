import root from "../../import.js"
import { _, utils, dayjs, logger } from "../../Common/systemCommon.js";
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { D_Transaction } from "../../FireStoreAPI/Collection/D_Transaction/class.js";
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/class.js";
import { Timestamp, Transaction } from "firebase-admin/firestore";

/**
 * @param {D_Transaction} doc
*/
async function observe(doc) {
    const mtran = await this.get(doc);

    // 対象のテーブルを監視する
    const status = mtran.statuses.find(s => s.status == doc.status);

    const count = await fireStoreManager.countDocs(status.collection, [["documentId", "==", doc.id], ["status", "!=", "COMPLETED"]]);

    return count == 0;
}

async function run() {
    try {
        const query = await fireStoreManager.getQuery("S_RunningState", [["job", "==", "OBSERVER"], ["nextTime", "<", Timestamp.fromMillis(dayjs())]], 1);
        for await (const doc of (await query.get()).docs) {
            /**
             * @type {S_RunningState}
             */
            const state = doc.data();
            if (state.nextTime.toDate() < dayjs().toDate()) {
                logger.info("定時処理開始");
                await runSchedule();
                logger.info("定時処理終了");

            }
        }
    }
    catch (e) {
        logger.error("定時処理失敗");
    }
    await runObserve();
}

/**
 * 定時処理を行います。
 */
async function runSchedule() {
    // M_Accountで回してM_Schedule作成

    // M_Requestのvalid?
}

/**
 * 監視処理を行います。
 */
async function runObserve() {
    const ref = await fireStoreManager.getDocsRef("D_Transaction", [["status", "!=", "COMPLETED"]]);
    for await (const doc of ref.docs) {
        const dtran = doc.data();
        const mtran = await this.get(dtran.id);
        const status = mtran.statuses.find(s => s.status == dtran.status);
        if (this.observe(status.collection)) {
            // 初期化処理
            // こいつがbatchを返すようにしないとだめか
            /**
             * @type {FirebaseFirestore.WriteBatch}
             */
            const batch = await fireStoreManager.createBatch();
            _.get(root, status.path.split("/"))(batch, doc.id);
            // statusを進める
            batch.update(ref, { status: status });
            batch.commit();
        }
    }
}

async function testTransaction() {
    //transactin試し
    /**
     * 
     * @param {Transaction} tran 
     * @param {object} obj 
     */
    const func = async (tran, obj) => {
        const query = await fireStoreManager.getQuery("S_RunningState", [["job", "==", "OBSERVER"], ["nextTime", "<", Timestamp.fromMillis(dayjs())]], 1);
        const snapshot = await tran.get(query);
        for await (const doc of snapshot.docs) {
            /**
             * @type {S_RunningState}
             */
            const data = doc.data();
            tran.update(doc.ref, { tag: "tran exactly!!" });
        }
    }
    await fireStoreManager.transaction([func]);
}

await run();