import root from "../../../../root.js"
import { _, logger, systemInfo, dayjs, utils } from "../../../../Common/common.js";
import { D_ReportRequest } from "../../D_ReportRequest/manager.js";
import { Timestamp } from "firebase-admin/firestore";
import collectionManager from "../../manager.js"

export class manager {
    constructor() {
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async skipOnce(drequest) {
        // 日付のみ更新
        return {
            lock: true,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async cancel(drequest) {
        // statusを更新
        return {
            status: "COMPLETED",
            lock: false,
            memo: "キャンセルされました",
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async createStatus(drequest) {
        // statusを更新
        return {
            status: "CREATE",
            requestTime: Timestamp.fromDate(systemInfo.nextTime.toDate()),
            lock: false,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async downloadStatus(drequest) {
        // statusを更新
        return {
            status: "DOWNLOAD",
            lock: false,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async rateLimit(drequest, res, info) {
        if(info)
            info.delay++;
        return {
            lock: false
        }
    }
}

logger.debug("import FireStoreAPI/Collection/M_Error/Handle");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Error", "Handle"], instance);

export default instance;