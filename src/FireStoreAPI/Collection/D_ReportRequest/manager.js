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
     * @param {string} path
     */
    return (path) => {
      // 時間を計算
      if (!add.has(path)) {
        add.set(path, 1);
        return 1;
      }

      /**
       * @type {number}
       */
      let count = add.get(path);
      count++;
      // 10分に1回休憩
      if (count % 10 == 0)
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