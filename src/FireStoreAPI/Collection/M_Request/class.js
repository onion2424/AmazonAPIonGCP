import { Timestamp } from "firebase-admin/firestore";

/**
 * @typedef {object} M_Request
 * @prop {string} tag リクエスト送信時間
 * @prop {boolean} valid 有効フラグ
 * @prop {[detail]} details 詳細
 * @prop {[status]} statuses 全ステータス
 */

/**
 * @type {M_Request}
 */
export const M_Request = {
    tag: "",
    valid: true,

    /**
     * @typedef {object} detail
     * @prop {object} body リクエストボディ
     * @prop {string} refName 参照名称
     * @prop {settings} settings 設定
     * @prop {string} tag タグ
     */

    /**
     * @typedef {object} settings
     * @prop {dateSettings} date 日付設定
     * @prop {saveSettings} save 保存設定
     */

    /**
     * @typedef {object} dateSettings
     * @prop {string} path パス
     * @prop {string} granularity 粒度
     * @prop {[number]} spans スパン
     * @prop {number} dateback さかのぼり期間
     */

     /**
     * @typedef {object} saveSettings
     * @prop {string} fileName
     * @prop {string} tableName
     * @prop {[string]} translaters
     */

    details: [{
        body: {},
        paths: [],
        refName: "",
        settings:
        {
            date:
            {
                path: "",
                spans: [],
                granularity: "",
                dateback: -1,
            },
            save:
            {
                fileName: "",
                tableName: "",
                translaters:[],
            }
        },
        fileName: "",
        tag: "",
    }],

    /** 
     * @typedef {object} status
     * @prop {string} path パス
     * @prop {string} status ステータス
     */
    statuses: [{
        path: "",
        status: "",
    }]
}