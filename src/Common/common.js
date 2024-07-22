import * as pathImport from 'path';
import dayjs from "dayjs";
import { toLocalDate } from './Helpers/Dayjs/toLocalDate.js';
import 'dayjs/locale/ja.js'
dayjs.locale('ja');
dayjs.extend(toLocalDate);
export { dayjs }
import lodash from "lodash";
export const _ = lodash;

// timezoneをセット
//process.env.TZ = "Asia/Tokyo";

class utilsClass {
    constructor() {

    }
    combine(...args) {
        return pathImport.join(...args).replace(/(\\)/g, '/');
    }
    /**
     * 引数を Date オブジェクトへ変換する。Date として解釈できなかった場合はundefinedを返す
     * @param {string} dateStr 
     * @returns Date|undefined
     */
    tryParseDate(dateStr) {
        if (dateStr instanceof Date) {
            return undefined;
        }
        if (typeof dateStr !== 'string' && typeof dateStr !== 'number') {
            return undefined;
        }
        const maybeDate = new Date(dateStr);
        const invalidDate = Number.isNaN(maybeDate.getTime());
        return invalidDate ? undefined : maybeDate;
    }

    /**
     * Version up
     * @param {string} str 
     * @param {number} level 
     * @returns 
     */
    nextVersion(str, level) {
        const arr = str.split(".");
        arr[level] = String(Number(arr[level]) + 1);
        for(let i = 3; i--; i > level){
            arr[i] = 0;
        }
        return arr.join(".");
    }

    /**
     * スレッド待機。
     * @param {*} sec 
     * @returns 
     */
    wait = (sec) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, sec * 1000);
            //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
        });
    };

}
export const utils = new utilsClass();

class amazonCommonClass{
    constructor(){

    }

    /**
     * URLエンドポイントを取得。
     * @param {string} api SP|ADS
     * @param {string} marketPlaceId 
     */
    getURLEndPoint(api, marketPlaceId){
        const fe = ["A1VC38T7YXB528", "A19VAU5U5O7RUS", "A39IBJ37TRP1C6"];
        const eu = ["A2VIGQ35RCS4UG", "A1PA6795UKMFR9", "ARBP9OOSHTCHU", "A1RKKUPIHCS9HS", "A13V1IB3VIYZZH", "A13V1IB3VIYZZH", "A1F83G8C2ARO7P", "A21TJRUUN4KGV", "APJ6JRA9NG5V4", "A1805IZSGTT6HS", "A1C3SOZRARQ6R3", "A17E79C6D8DWNP", "A2NODRKZP88ZB9", "A33AVAJ2PDY3EV"];
        const na = ["A2Q3Y263D00KWC", "A2EUQ1WTGCTBG2", "A1AM78C64UM0Y8", "ATVPDKIKX0DER"];
        if(fe.includes(marketPlaceId)){
            return "-fe";
        }
        else if(er.includes(marketPlaceId)){
            return "-eu"
        }
        else if(na.includes(marketPlaceId)){
            return api == "SP" ? "-na" : "";
        }
        return "";
    }
}
export const amazonCommon = new amazonCommonClass();

class gcpCommonClass{
    constructor(){
        /** 
         * AmazonAdsAPI
         * @type {string}
         */
        this.AMAZON_ADS_API_REPORT = "AmazonAdsApiReport";
        /** 
         * AmazonAdsAPI
         * @type {string}
         */
        this.AMAZON_SP_API_REPORT = "AmazonSpApiReport";
    }
}
export const gcpCommon = new gcpCommonClass();

class systemInfoClass {
    constructor() {
        /**
         * RELEASE|TEST
         * @type {string}
         */
        this.mode = process.argv.some(arg => arg == "-release") ? "RELEASE" : "TEST";

        /**
         * SIGTERMを受信しているかどうか
         * @type {boolean}
         */
        this.sigterm = false;

        /**
         * 次回起動時間
         * @type {dayjs.Dayjs}
         */
        this.nextTime = null;
    }
    isTest() {
        return this.mode == "TEST";
    }
}
export const systemInfo = new systemInfoClass();

// https://zenn.dev/aiji42/articles/b41232aea7ca34
import winston from 'winston';
import { LoggingWinston } from "@google-cloud/logging-winston"

const severity = winston.format((info) => {
    info["severity"] = info.level.toUpperCase();
    return info;
});

const errorReport = winston.format((info) => {
    if (info instanceof Error) {
        info.err = {
            name: info.name,
            message: info.message,
            stack: info.stack,
        };
    }
    return info;
});

export const logger = winston.createLogger({
    level: systemInfo.isTest() ? 'debug' : 'info',
    format: winston.format.combine(
        severity(),
        errorReport(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        //new LoggingWinston()
    ],
});

process.once("SIGTERM", async () => {
    logger.warn("[SIGTERM検出][systemInfo.sigterm=true]");
    systemInfo.sigterm = true;
});
