/*
import manager from "../../manager.js"
const reffer = await manager.getDocs("M_Request");
console.log('%o', reffer);
*/
import { _, utils, dayjs } from "../../../Common/systemCommon.js";
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} D_ReportRequest 
 * @prop {Timestamp} requestTime リクエスト送信時間
 * @prop {DocumentReference} accountRef M_Accountのリファレンス
 * @prop {requestInfo} requestInfo リクエスト情報
 * @prop {string} status 現在のステータス
 * @prop {number} continue コンティニュー回数
 * @prop {number} host ホスト
 * @prop {[string]} statuses 遷移ステータス
 * @prop {reportInfo} reportInfo レポート情報
 * @prop {DocumentReference} transactionRef D_Transactionのリファレンス
 */

/**
 * @type {D_ReportRequest}
 */
export const D_ReportRequest = {
    requestTime: null,
    accountRef: null,

    /**
     * @typedef {object} requestInfo
     * @prop {DocumentReference} ref M_Requestのリファレンス
     * @prop {string} refName 参照名称
     * @prop {object} date 日時
     */
    requestInfo:
    {
        ref: null,
        refName: "",
        date: {}
    },
    status: "",
    continue: 0,
    host: 0,
    statuses: [],

    /**
     * @typedef {object} reportInfo
     * @prop {string} reportId レポートID
     * @prop {string} filepath ファイルパス
     * @prop {Timestamp} expiration 有効期限
     * @prop {string} url URL
     * @prop {string} documentId ドキュメントID
     * @prop {Timestamp} created レポート作成日時
     */
    reportInfo: {
        reportId: "",
        filepath: "",
        //expiration: null,
        url: "",
        documentId: "",
        //created: null,
    },
    transactionRef: null,
}