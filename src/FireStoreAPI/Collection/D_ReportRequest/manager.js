import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import collectionManaer from "../manager.js" // import順を考慮
import { M_Request } from "../M_Request/class.js";
import { D_ReportRequest } from "./class.js";

export { D_ReportRequest } from "./class.js";


export class manager {
  constructor() {
    this.create = create;
  }

  /**
   * 
   * @returns 
   */
  allocation() {
    const add = new Map();
    /**
     * @param {M_Request} mrequest
     * @param {D_ReportRequest} drequest
     */
    return (mrequest, drequest) => {
      // 時間を計算
      const path = mrequest.statuses.find(s => s.status == drequest.status).path;
      if (!add.has(path)) {
        add.set(path, 0);
        return 0;
      }

      /**
       * @type {number}
       */
      let count = add.get(path);
      count++;
      // 10分に1回休憩
      if (add % 10 == 0)
        count++;
      add.set(path, count);
      return count;
    }
  }
}

logger.debug("import FireStoreAPI/Collection/D_ReportRequest");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "D_ReportRequest"], instance);

export default instance;