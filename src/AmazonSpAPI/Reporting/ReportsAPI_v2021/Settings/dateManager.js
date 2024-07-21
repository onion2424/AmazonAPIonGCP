import root from "../../../../root.js";
import { _, utils, dayjs, logger} from "../../../../Common/common.js";

// observerからのみimport
class manager
{
    constructor()
    {
    }
    /**
     * リクエスト用の日時を取得します。
     * @param {dayjs.Dayjs} date 
     */
    getDate(date) {
        let ret = {
            start: date.format("YYYY-MM-DD") + "T00:00:00.000Z",
            end: date.format("YYYY-MM-DD") + "T23:59:00.999Z",
        };
        return ret;
    }
}


logger.debug("import AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date");

const instance = new manager();

_.set(root, ["AmazonSpAPI", "Reporting", "ReportsAPI_v2021", "Settings", "Date"], instance);

export default instance;