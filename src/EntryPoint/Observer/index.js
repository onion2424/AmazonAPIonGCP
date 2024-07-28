import root from "./import.js"
import { _, utils, dayjs, logger, systemInfo } from "../../Common/common.js";
import collectiomManager from "../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../FireStoreAPI/manager.js"
import M_AccountManager, { M_Account } from "../../FireStoreAPI/Collection/M_Account/manager.js";
import M_TransactionManager, { M_Transaction } from "../../FireStoreAPI/Collection/M_Transaction/manager.js";
import D_ScheduleManager, { D_Schedule } from "../../FireStoreAPI/Collection/D_Schedule/manager.js"
import D_TransactionManager, { D_Transaction } from "../../FireStoreAPI/Collection/D_Transaction/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";
import { Timestamp, Transaction } from "firebase-admin/firestore";
import L_ErrorManager from "../../FireStoreAPI/Collection/L_Error/manager.js";
/**
 * エントリーポイント
 */
async function main() {
    // 次回起動時間を保存
    systemInfo.nextTime = dayjs().add(5, 'minute').startOf('minute');
    L_ErrorManager.initialize("OBSERVER", "WRITE|SAVE");
    const docs = await fireStoreManager.getDocs("S_RunningState", [["job", "==", "OBSERVER"]], [], 1);
    for await (const doc of docs) {
        /**
         * @type {S_RunningState}
         */
        const state = doc.data();

        logger.info(`[起動][${state.tag}][Version=${state.version}]`);

        if (state.nextTime.toDate() < dayjs().toDate()) {
            logger.info(`[定時処理開始][今回日時：${dayjs(state.nextTime.toDate()).format("YYYY-MM-DD HH:mm:ss")}]`);
            const ret = await runSchedule();
            if (ret) {
                const nextTime = dayjs(state.nextTime.toDate()).add(1, 'day').startOf('day').add(90, 'minute');
                await fireStoreManager.updateRef(doc.ref, { nextTime: Timestamp.fromDate(nextTime.toDate()) });
                logger.info(`[定時処理終了][次回日時：${nextTime.format("YYYY-MM-DD HH:mm:ss")}]`);
            }
        }
    }

    logger.info(`[定期監視開始]`);
    await runObserve();
    logger.info(`[定期監視終了]`);
}

/**
 * 定時処理を行います。
 */
async function runSchedule() {
    let currentDoc;
    try {
        // キャッシュを行う
        await collectiomManager.caching();

        const date = dayjs().startOf('day');

        // M_Accountで回してD_Schedule作成or無効化
        for (const accountDoc of M_AccountManager.cache) {
            currentDoc = accountDoc;
            /**
             * @type { M_Account }
             */
            const account = accountDoc.data();
            if (!account.valid) continue;
            logger.info(`[スケジューリング開始][${account.tag}]`);
            for await (const mtranDoc of M_TransactionManager.cache) {
                /**
                 * @type { M_Transaction }
                 */
                const mtran = mtranDoc.data();
                // transactionをスケジュールに展開
                if (mtran.refName != "regularCall") continue;
                //該当するD_Scheduleを取得
                let doc = (await fireStoreManager.getDocs("D_Schedule", [["accountRef", "==", accountDoc.ref], ["transactionRef", "==", mtranDoc.ref]]))[0];
                if (!doc) {
                    const batch = await fireStoreManager.createBatch();

                    // D_Scheduleがなければ作成
                    const dschedule = D_ScheduleManager.create(accountDoc, mtranDoc, date);

                    // D_Transactionを作成
                    const dtranRef = await fireStoreManager.createRef("D_Transaction");
                    batch.set(dtranRef, D_TransactionManager.create(mtranDoc, accountDoc.ref, dayjs(dschedule.date.toDate())));

                    // 当日のは使用済みとし、翌日にする
                    dschedule.date = Timestamp.fromDate(date.add(1, 'day').toDate());
                    const dscheduleRef = await fireStoreManager.createRef("D_Schedule");
                    batch.set(dscheduleRef, dschedule);
                    await fireStoreManager.commitBatch(batch);
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
                        batch.set(dtranRef, D_TransactionManager.create(mtranDoc, accountDoc.ref, dayjs(dschedule.date.toDate())));
                        batch.update(doc.ref, { date: Timestamp.fromDate(dayjs(dschedule.date.toDate()).add(1, 'day').startOf('day').toDate()) });
                        await fireStoreManager.commitBatch(batch);
                        logger.info(`[更新][${mtran.tag}]`);
                    }
                    else {
                        logger.info(`[パス][${mtran.tag}]`);
                    }
                }
                logger.info(`[スケジューリング終了][${account.tag}]`);
            }
        }
        currentDoc = null;
        // ファイル削除処理

        // リクエスト削除処理何日分？
        return true;
    } catch (e) {
        await L_ErrorManager.onSystemError(e, currentDoc.data());
        return false;
    }
}

/**
 * 監視処理を行います。
 */
async function runObserve() {
    let currentDoc;
    try {
        // Transaction監視
        const dtranDocs = await fireStoreManager.getDocs("D_Transaction", [["status", "!=", "COMPLETED"]]);
        logger.info(`[監視対象][合計${dtranDocs.length}件]`);
        let count = 0;
        for await (const dtranDoc of dtranDocs) {
            currentDoc = dtranDoc;
            // SIGTERM検出時終了処理
            if (systemInfo.sigterm) {
                logger.warn("[SIGTERM検出][処理中断]");
                return;
            }

            const dtran = dtranDoc.data();
            /**
             * @type {M_Transaction}
             */
            const mtranDoc = (await collectiomManager.get(dtran.transactionRef));
            const mtran = mtranDoc.data();
            const status = mtran.statuses.find(s => s.status == dtran.status);
            logger.info(`[監視開始][${dtranDoc.id}][${++count}/${dtranDocs.length}件]`);
            if (dtran.status == "" || await observe(status.collection, dtranDoc)) {
                if (status && status.finalize) {
                    // ファイナライズ処理
                    await _.get(root, status.finalize.split("/"))(batch, mtranDoc, dtranDoc);
                }
                // 次に進めて初期化処理
                const index = mtran.statuses.indexOf(status);
                const nextStatus = mtran.statuses[index + 1];
                /**
                 * @type {FirebaseFirestore.WriteBatch}
                 */
                const batch = await fireStoreManager.createBatch();
                if (nextStatus) {
                    // イニシャライズ処理
                    await _.get(root, nextStatus.initialize.split("/"))(batch, mtranDoc, dtranDoc);
                }
                // statusを進める
                batch.update(dtranDoc.ref, { status: nextStatus?.status || "COMPLETED" });
                await fireStoreManager.commitBatch(batch);

                logger.info(`[ステータス更新][${status?.status || "empty"} ⇒ ${nextStatus?.status || "COMPLETED"}]`);
            }
            logger.info(`[監視終了][${dtranDoc.id}][${count}/${dtranDocs.length}件]`);
        }
    } catch (e) {
        await L_ErrorManager.onSystemError(e, currentDoc.data());
    }
}

/**
 * 対象のテーブルを監視します。
 * @param {D_Transaction} doc
*/
async function observe(collection, dtranDoc) {
    const count = await fireStoreManager.countDocs(collection, [["transactionRefs", "array-contains", dtranDoc.ref], ["status", "!=", "COMPLETED"]]);

    logger.info(`[継続中][${collection}][残り${count}レコード]`);

    return count == 0;
}

await main();