import root from "../../../../root.js"
import { _, logger, systemInfo, dayjs } from "../../../../Common/common.js";
import { D_ReportRequest } from "../../D_ReportRequest/manager.js";
import { Timestamp } from "firebase-admin/firestore";

export class manager {
    constructor() {
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    skipOnce(drequest) {
        // 日付のみ更新
        return {
            requestTime: Timestamp.fromDate(systemInfo.nextTime.toDate()),
            // reportInfo: drequest.reportInfo,
            // status: drequest.status,
            host: 0,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    cancel(drequest) {
        // statusを更新
        return {
            status: "COMPLETED",
            host: 0,
            memo: "キャンセルされました",
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    createStatus(drequest) {
        // statusを更新
        return {
            status: "CREATE",
            host: 0,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    downloadStatus(drequest) {
        // statusを更新
        return {
            status: "DOWNLOAD",
            host: 0,
        }
    }
}

logger.debug("import FireStoreAPI/Collection/M_Error/Handle");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Error", "Handle"], instance);

export default instance;