import root from "./import.js" 
import { _, utils, dayjs, logger, systemInfo } from "../../Common/systemCommon.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import M_AccountManager, { M_Account } from "../../FireStoreAPI/Collection/M_Account/manager.js";
import M_TransactionManager, { M_Transaction } from "../../FireStoreAPI/Collection/M_Transaction/manager.js";
import D_ScheduleManager, { D_Schedule } from "../../FireStoreAPI/Collection/D_Schedule/manager.js"
import D_TransactionManager, { D_Transaction } from "../../FireStoreAPI/Collection/D_Transaction/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { Timestamp, Transaction } from "firebase-admin/firestore";

/**
 * エントリーポイント
 */
async function main() {
    try {
        //const docs = await fireStoreManager.getDocs("S_RunningState", [["job", "==", "OBSERVER"], ["nextTime", "<", Timestamp.fromMillis(dayjs())]], 1);
        const docs = await fireStoreManager.getDocs("S_RunningState", [["job", "==", "OBSERVER"]], [], 1);
        for await (const doc of docs) {
            /**
             * @type {S_RunningState}
             */
            const state = doc.data();

            logger.info(`[起動][${state.tag}][Version = ${state.version}]`);

            if (state.nextTime.toDate() < dayjs().toDate()) {
                logger.info(`[定時処理開始][今回日時：${dayjs(state.nextTime.toDate()).format("YYYY-MM-DD HH:mm:ss")}]`);
                await runSchedule();
                const nextTime = dayjs(state.nextTime.toDate()).add(1, 'day').startOf('day').add(90, 'minute');
                doc.ref.update({nextTime: Timestamp.fromDate(nextTime.toDate())});
                logger.info(`[定時処理終了][次回日時：${nextTime.format("YYYY-MM-DD HH:mm:ss")}]`);
            }
        }
    }
    catch (e) {
        logger.error("[定時処理失敗][エラー内容表示]", e);
    }
    logger.info(`[定期監視処理開始]`);
    await runObserve();
    logger.info(`[定期監視処理終了]`);
}

/**
 * 定時処理を行います。
 */
async function runSchedule() {
    // キャッシュを行う
    await collectiomManager.caching();

    const date = dayjs().startOf('day');

    // M_Accountで回してD_Schedule作成or無効化
    for (const accountDoc of M_AccountManager.cache) {
        /**
         * @type { M_Account }
         */
        const account = accountDoc.data();
        if(!account.valid) continue;
        logger.info(`[スケジューリング開始][${account.tag}]`);
        for await (const mtranDoc of M_TransactionManager.cache) {
            /**
             * @type { M_Transaction }
             */
            const mtran = mtranDoc.data();
            // transactionをスケジュールに展開
            //該当するD_Scheduleを取得
            let doc = (await fireStoreManager.getDocs("D_Schedule", [["accountRef", "==", accountDoc.ref], ["transactionRef", "==", mtranDoc.ref]]))[0];
            if (!doc) {
                const batch = await fireStoreManager.createBatch();
                
                // D_Scheduleがなければ作成
                const dschedule = D_ScheduleManager.create(accountDoc, mtranDoc, date);

                // D_Transactionを作成
                const dtranRef = await fireStoreManager.createRef("D_Transaction");
                batch.set(dtranRef, D_TransactionManager.create(dschedule, mtranDoc, accountDoc));

                // 当日のは使用済みとし、翌日にする
                dschedule.date = Timestamp.fromDate(date.add(1, 'day').toDate());
                const dscheduleRef = await fireStoreManager.createRef("D_Schedule");
                batch.set(dscheduleRef, dschedule);
                await batch.commit();
                logger.info(`[新規][${mtran.tag}]`);
            }
            else {
                // あれば日時を見て、今より小さければD_Transactionに展開
                /**
                 * @type {D_Schedule}
                 */
                const dschedule = doc.data();

                if (dayjs(dschedule.date.toDate()) <= date) {
                    const batch = await fireStoreManager.createBatch();
                    // D_Transactionを作成
                    const dtranRef = await fireStoreManager.createRef("D_Transaction");
                    batch.set(dtranRef, D_TransactionManager.create(dschedule, mtranDoc, accountDoc));
                    batch.update(doc.ref, { date: Timestamp.fromDate(dayjs(dschedule.date.toDate()).add(1, 'day').startOf('day').toDate()) });
                    await batch.commit();
                    logger.info(`[更新][${mtran.tag}]`);
                }
                else {
                    logger.info(`[パス][${mtran.tag}]`);
                }
            }
            logger.info(`[スケジューリング終了][${account.tag}]`);
        }
    }
    // ファイル削除処理

    // リクエスト削除処理何日分？
}

/**
 * 監視処理を行います。
 */
async function runObserve() {
    // Transaction監視
    const dtranDocs = await fireStoreManager.getDocs("D_Transaction", [["status", "!=", "COMPLETED"]]);
    logger.info(`[監視対象][合計${dtranDocs.length}件]`);
    let count = 0;
    for await (const dtranDoc of dtranDocs) {
        // SIGTERM検出時終了処理
        if(systemInfo.sigterm) {
            logger.warn("[SIGTERM検出][処理中断]");
            return;
        }

        const dtran = dtranDoc.data();
        /**
         * @type {M_Transaction}
         */
        const mtranDoc = (await collectiomManager.get(dtran.transactionRef));
        const call = mtranDoc.data().details.find(d => d.refName == dtran.refName);
        const status = call.statuses.find(s => s.status == dtran.status);
        logger.info(`[監視開始][${dtranDoc.id}][${++count}/${dtranDocs.length}件]`);
        if (dtran.status == "" || await observe(status.collection, dtranDoc)) {
            // 次に進めて初期化処理
            const index = call.statuses.indexOf(status);
            const nextStatus = call.statuses[index + 1];
            /**
             * @type {FirebaseFirestore.WriteBatch}
             */
            const batch = await fireStoreManager.createBatch();
            if (nextStatus) {
                // 初期化処理
                await _.get(root, nextStatus.path.split("/"))(batch, mtranDoc, dtranDoc);
            }
            // statusを進める
            batch.update(dtranDoc.ref, { status: nextStatus?.status || "COMPLETED" });
            batch.commit();

            logger.info(`[ステータス更新][${status?.status || "empty"} ⇒ ${nextStatus?.status || "COMPLETED"}]`);
        }
        logger.info(`[監視終了][${dtranDoc.id}][${count}/${dtranDocs.length}件]`);
    }
}

/**
 * 対象のテーブルを監視すします。
 * @param {D_Transaction} doc
*/
async function observe(collection, dtranDoc) {
    const count = await fireStoreManager.countDocs(collection, [["transactionRef", "==", dtranDoc.ref], ["status", "!=", "COMPLETED"]]);

    logger.info(`[継続中][${collection}][残り${count}レコード]`);

    return count == 0;
}

await main();