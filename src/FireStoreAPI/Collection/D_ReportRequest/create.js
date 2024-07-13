import { D_ReportRequest } from "./class.js";
import { M_Request } from "../M_Request/class.js";
import { M_Account } from "../M_Account/class.js";
import { Timestamp } from "firebase-admin/firestore";
import { _, utils, dayjs} from "../../../Common/systemCommon.js";
import root from "../../../import.js"

/**
 * tokenInfo形式のjsonを受け取り、D_Tokenを返す
 * @param { M_Request } request 
 * @param { M_Account } account
 * @param { dayjs.Dayjs } basedate
 * @param { [number] } spans
 * @returns 
 */
export function create(request, refName, account, basedate, spans) {
    const ret = [];

    const detail = request.details.find((detail) => detail.refName == refName);

    for (const span of spans) {
        // 日付
        const doc = structuredClone(D_ReportRequest);
        doc.requestTime = Timestamp.fromMillis(basedate);
        doc.accountId = account.documentId;
        const requestInfo = {
            id: request.documentId,
            refName: detail.refName,
            date: _.get(root, detail.settings.date.path.split('/'))(basedate.add(-span, 'day')),
        }
        doc.requestInfo = requestInfo;
        doc.statuses = _.map(request.statuses, (s) => s.status);
        doc.status = doc.statuses[0];
        ret.push(doc);
    }
    return ret;
}