import * as pathImport from 'path';
import dayjs from "dayjs";
import { toLocalDate } from './Helpers/Dayjs/toLocalDate.js';
import 'dayjs/locale/ja.js'
dayjs.locale('ja');
dayjs.extend(toLocalDate);
export {dayjs}
import lodash  from "lodash";
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
     *    引数を Date オブジェクトへ変換する。Date として解釈できなかった場合はundefinedを返す
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
}
export const utils = new utilsClass();

class systemInfoClass {
    constructor() {
        /**
         * RELEASE|TEST
         * @type {string}
         */
        this.mode = process.argv.some(arg => arg == "-release") ? "RELEASE" : "TEST";
    }
    isTest() {
        return this.mode == "TEST";
    }
}
export const systemInfo = new systemInfoClass();

// https://zenn.dev/aiji42/articles/b41232aea7ca34
import winston from 'winston';
import {LoggingWinston} from "@google-cloud/logging-winston"

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