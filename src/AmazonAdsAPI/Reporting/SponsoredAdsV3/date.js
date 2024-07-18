import { _, utils, dayjs} from "../../../Common/common.js";

/**
 * リクエスト用の日時を取得します。
 * @param {dayjs.Dayjs} date 
 */
export function getDate(date) {
    let ret = {
        start: date.format("YYYY-MM-DD"),
        end: date.format("YYYY-MM-DD"),
    };
    return ret;
}