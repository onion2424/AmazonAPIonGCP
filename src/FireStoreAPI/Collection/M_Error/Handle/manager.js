import root from "../../../../root.js"
import { _, logger, systemInfo, dayjs, utils } from "../../../../Common/common.js";
import { D_ReportRequest } from "../../D_ReportRequest/manager.js";
import { Timestamp } from "firebase-admin/firestore";
import collectionManager from "../../manager.js"
import R_DelayManager from "../../R_Delay/manager.js";

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
    async cancel(drequest) {
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
    async createStatus(drequest) {
        // statusを更新
        return {
            status: "CREATE",
            requestTime: Timestamp.fromDate(systemInfo.nextTime.toDate()),
            host: 0,
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
            host: 0,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     */
    async rateLimit(drequest, res) {
        const rdelay = await R_DelayManager.add(res.token);
        await utils.wait(3);
        return {
            requestTime: rdelay.time,
            host: 0,
        }
    }

    /**
     * 
     * @param {D_ReportRequest} drequest 
     * @param {*} res 
     * @returns 
     */
    async delay(drequest, res){
        return {
            // 10秒後にする
            requestTime: res.delay.time,
            host: 0,
        }
    }
}

logger.debug("import FireStoreAPI/Collection/M_Error/Handle");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Error", "Handle"], instance);

export default instance;