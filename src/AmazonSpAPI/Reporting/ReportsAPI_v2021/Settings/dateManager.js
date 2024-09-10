import root from "../../../../root.js";
import { _, utils, dayjs, logger } from "../../../../Common/common.js";

// observerからのみimport
class manager {
    constructor() {
    }
    /**
     * リクエスト用の日時を取得します。
     * @param {dayjs.Dayjs} date 
     */
    getDate(date, granularity, timezone) {
        /*
        console.log(dayjs("2024-08-16 00:00:00").utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs.tz("2024-08-16 00:00:00", "Asia/Singapore").utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs("2024-08-16 00:00:00").utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs().utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs().tz("Asia/Singapore", true).utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs().utc().format("YYYYMMDD HH:mm:ss"));
        console.log(dayjs().utc().format("YYYYMMDD HH:mm:ss.SSSZ"));
        console.log(dayjs().tz("Asia/Singapore", true).format("YYYYMMDD HH:mm:ss.SSSZ"));
        console.log(dayjs().format("YYYYMMDD HH:mm:ss.SSSZ"));
        */
        let ret = {
            start: date.tz(timezone, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            end: date.tz(timezone, true).add(1, "day").add(-1, "millisecond").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        };
        return ret;
    }

    /**
     * 
     * @param {dayjs.Dayjs} date 
     * @param {*} granularity 
     * @param {*} timezone 
     */
    getDate2(date, granularity, timezone) {
        let start = date.tz(timezone, true);
        let end = date.tz(timezone, true).add(1, "day").add(-1, "millisecond");
        let ret = {
            start: start.add(start.utcOffset(), "minute").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            end: end.add(end.utcOffset(), "minute").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        };
        return ret;
    }

    getDate3(date, granularity, timezone){
        let start = date;
        let end = date.add(1, "day").add(-1, "millisecond");
        let ret = {
            start: start.format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
            end: end.format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
        };
        return ret;
    }
}


logger.debug("import AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date");

const instance = new manager();

_.set(root, ["AmazonSpAPI", "Reporting", "ReportsAPI_v2021", "Settings", "Date"], instance);

export default instance;