import { D_ReportRequest } from "./class.js";
import { M_Request } from "../M_Request/class.js";
import { M_Account } from "../M_Account/class.js";
import { DocumentReference, DocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { _, utils, dayjs} from "../../../Common/common.js";
import root from "../../../root.js"

/**
 * tokenInfo形式のjsonを受け取り、D_Tokenを返す
 * @param { DocumentSnapshot } requestDoc
 * @param { DocumentSnapshot } accountDoc
 * @param { DocumentSnapshot } transactionDoc
 * @param { dayjs.Dayjs } basedate
 * @param { [number] } spans
 * @returns 
 */
export function create(requestDoc, refName, accountDoc, transactionDoc, basedate, spans) {
    const ret = [];
    const request = requestDoc.data();

    const detail = request.details.find((d) => d.refName == refName);
    for (const span of spans) {
        // 日付
        const doc = structuredClone(D_ReportRequest);
        doc.requestTime = Timestamp.fromDate(basedate.toDate());
        doc.accountRef = accountDoc.ref;
        const requestInfo = {
            ref: requestDoc.ref,
            refName: detail.refName,
            date: _.get(root, detail.settings.date.path.split('/'))(basedate.add(-span, 'day')),
        }
        doc.requestInfo = requestInfo;
        doc.statuses = _.map(request.statuses, (s) => s.status);
        doc.status = doc.statuses[0];
        doc.transactionRef = transactionDoc.ref;
        ret.push(doc);
    }
    return ret;
}