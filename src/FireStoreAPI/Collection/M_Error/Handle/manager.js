import root from "../../../../root.js"
import { _, logger, systemInfo, dayjs, utils } from "../../../../Common/common.js";
import { D_ReportRequest } from "../../D_ReportRequest/manager.js";
import { Timestamp } from "firebase-admin/firestore";
import collectionManager from "../../manager.js"

export class manager {
    constructor() {
    }

    async skipOnce() {
        return {
            lock: true,
        }
    }

    async cancel() {
        // statusを更新
        return {
            status: "COMPLETED",
            lock: false,
            memo: "キャンセルされました",
        }
    }

    async createStatus() {
        // statusを更新
        return {
            status: "CREATE",
            //requestTime: Timestamp.fromDate(systemInfo.nextTime.toDate()),
            lock: true,
        }
    }

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
     * @param {*} syncObj 
     * @returns 
     */
    async rateLimit(drequest, syncObj) {
        if(syncObj){
            /**
             * @type{dayjs.Dayjs}
             */
            const requestTime = await syncObj.rateLimit(drequest.accountRef, syncObj.state);
            if(requestTime)
                return {
                    requestTime: Timestamp.fromDate(requestTime.toDate()),
                    lock: false,
                }
        }
        return {
            lock: true,
        }
    }
}

logger.debug("import FireStoreAPI/Collection/M_Error/Handle");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Error", "Handle"], instance);

export default instance;