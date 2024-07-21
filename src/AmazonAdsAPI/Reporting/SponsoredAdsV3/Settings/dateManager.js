import { _, utils, dayjs, logger} from "../../../../Common/common.js";
import root from "../../../../root.js";

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
            start: date.format("YYYY-MM-DD"),
            end: date.format("YYYY-MM-DD"),
        };
        return ret;
    }
}


logger.debug("import AmazonAdsAPI/Reporting/SponsoredAdsV3/Settings/Date");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Reporting", "SponsoredAdsV3", "Settings", "Date"], instance);

export default instance;