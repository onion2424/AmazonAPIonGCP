import { _, utils, dayjs} from "../../../Common/common.js";

/**
 * リクエスト用の日時を取得します。
 * @param {dayjs.Dayjs} date 
 */
export function getDate(date) {
    let ret = {
        start: date.format("YYYY-MM-DD") + "T00:00:000",
        end: date.format("YYYY-MM-DD") + "T23:59:999",
    };
    return ret;
}