import FirestoreManager from "../../manager.js"
import { S_RunningState } from './class.js';
import { _, dayjs } from "../../../Common/common.js";
import { Timestamp } from "firebase-admin/firestore";

{
    let docRef = await FirestoreManager.createRef("S_RunningState");

    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "監視ジョブ",
        job: "OBSERVER",
        nextTime: Timestamp.fromMillis(dayjs()),
    }
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createRef("S_RunningState");

    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "レポート受信ジョブ",
        job: "RECEIVER",
        accountRefs: [],
        nextTime: Timestamp.fromMillis(dayjs()),
    }
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createRef("S_RunningState");
    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "バッチレポート受信ジョブ",
        job: "BATCHRECEIVER",
        accountRefs: [],
        nextTime: Timestamp.fromMillis(dayjs()),
    }
    await docRef.set(data);
}

console.log("Success!")