import { _, logger, dayjs } from "../../../../../Common/common.js";
import { M_Transaction } from "../../manager.js";
import D_TransactionManager, { D_Transaction } from "../../../D_Transaction/manager.js";
import D_ScheduleManager, { D_Schedule } from "../../../D_Schedule/manager.js";
import fireStoreManager from "../../../../manager.js"
import { DocumentSnapshot } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

/**
 * RegularCallを展開
 * @param {dayjs.Dayjs} date
 * @param {DocumentSnapshot} acccountDoc
 * @param {DocumentSnapshot} mtranDoc
 * @returns
 */
export async function schedulize(date, accountDoc, mtranDoc) {
    /**
     * @type { M_Transaction }
     */
    const mtran = mtranDoc.data();
    //該当するD_Scheduleを取得
    let doc = (await fireStoreManager.getDocs("D_Schedule", [["accountRef", "==", accountDoc.ref], ["transactionRef", "==", mtranDoc.ref]]))[0];
    if (!doc) {
        /*
        const batch = await fireStoreManager.createBatch();

        // D_Scheduleがなければ作成
        const dschedule = D_ScheduleManager.create(accountDoc, mtranDoc, date);

        // D_Transactionを作成
        // firstreportがあれば、それまでの差分を埋める必要がある
        const dtranRef = await fireStoreManager.createRef("D_Transaction");
        batch.set(dtranRef, D_TransactionManager.create(mtranDoc, accountDoc.ref, dayjs(dschedule.date.toDate())));

        // 当日のは使用済みとし、翌日にする
        dschedule.date = Timestamp.fromDate(date.add(1, 'day').toDate());
        const dscheduleRef = await fireStoreManager.createRef("D_Schedule");
        batch.set(dscheduleRef, dschedule);
        await fireStoreManager.commitBatch(batch);
        logger.info(`[新規][${mtran.tag}]`);
        */
        throw new Error("D_Scheduleなし");
    }
    else {
        // あれば日時を見て、今より小さければD_Transactionに展開
        /**
         * @type {D_Schedule}
         */
        const dschedule = doc.data();

        if (dayjs(dschedule.date.toDate()).startOf("second") <= date.startOf("second")) {
            const batch = await fireStoreManager.createBatch();
            // D_Transactionを作成
            const dtranRef = await fireStoreManager.createRef("D_Transaction");
            const dtran = D_TransactionManager.create(mtranDoc, accountDoc.ref, date);
            dtran.spans = [...Array(date.startOf("day").diff(dayjs(dschedule.date.toDate()).startOf("day"), "day") + 1)].map((_, i) => i);
            batch.set(dtranRef, dtran);
            batch.update(doc.ref, { date: Timestamp.fromDate(date.add(1, 'day').startOf('day').toDate()) });
            await fireStoreManager.commitBatch(batch);
            logger.info(`[更新][${mtran.tag}]`);
        }
        else {
            logger.info(`[パス][${mtran.tag}]`);
        }
    }
}