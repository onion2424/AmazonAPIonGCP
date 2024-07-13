import FirestoreManager from "../../manager.js"
import { S_RunningState } from './class.js';
import { _, dayjs } from "../../../Common/systemCommon.js";
import { Timestamp } from "firebase-admin/firestore";


{
    let docRef = await FirestoreManager.createDoc("S_RunningState");

    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "監視ジョブ",
        job: "OBSERVER",
        hosts: [0],
        nextTime: Timestamp.fromMillis(dayjs()),
        version: "0.0.0.1",
    }
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createDoc("S_RunningState");

    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "レポート受信ジョブ",
        job: "RECEIVER",
        hosts: [1, 2, 3],
        nextTime: Timestamp.fromMillis(dayjs()),
        version: "0.0.0.1",
    }
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createDoc("S_RunningState");

    /**
     * @type {S_RunningState}
     */
    let data = {
        tag: "レポート受信ジョブ",
        job: "RECEIVER",
        hosts: [4, 5, 6],
        nextTime: Timestamp.fromMillis(dayjs()),
        version: "0.0.0.1",
    }
    await docRef.set(data);
}

console.log("Success!")
// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction