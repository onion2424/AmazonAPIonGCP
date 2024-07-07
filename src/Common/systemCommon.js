import * as pathImport from 'path';
import lodash from "lodash";

// timezoneをセット
process.env.TZ = "Asia/Tokyo";

class utilsClass {
    constructor() {

    }
    combine(...args) {
        return pathImport.join(...args).replace(/(\\)/g, '/');
    }
    /**
     *    引数を Date オブジェクトへ変換する。Date として解釈できなかった場合はundefinedを返す
     * @param {*} dateStr 
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
export const _ = lodash;