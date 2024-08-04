import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { caching } from "./caching.js";
import collectionManaer from "../manager.js"
import fireStoreManager from "../../manager.js"
import { M_Error } from "./class.js";
import { D_ReportRequest } from "../D_ReportRequest/class.js";
export { M_Error } from "./class.js";

export class manager {
  constructor() {
    this.create = create;
    this.cache = [];
    this.cached = false;
  }

  async caching() {
    if (this.cached) return;
    logger.debug("M_Error：キャッシング開始");
    this.cache = await caching();
    this.cached = true;
    logger.debug("M_Error：キャッシング完了");
  }

  /**
   * 
   * @param {D_ReportRequest} drequest 
   * @param {M_Error} info 
   * @returns {Promise<M_Error>}
   */
  async getOrAdd(drequest, info) {
    // cacheを行う
    if(!this.cached)
      await this.caching();

    // cacheから探す
    let ret = this.cache.find(c => {
      /**
       * @type {M_Error}
       */
      const data = c.data();
      if (data.path == data.path && data.status == info.status) {
        return _.get(root, data.equal.split("/"))(data, info, drequest);
      }
      return false;
    });
    if (!ret) {
      // トランザクション
      const getfunc = async (tran, obj) => {
        const query = await fireStoreManager.getQuery("M_Error", [["ref", "==", drequest.requestInfo.ref], ["status", "==", info.status], ["response", "==", info.response]], [], 1);
        const snapshot = await tran.get(query);
        for await (const doc of snapshot.docs) {
          /**
           * @type {S_RunningState}
           */
          obj.doc = doc;
        }
      }

      const writefunc = async (tran, obj) => {
        if (!obj.doc) {
          const ref = fireStoreManager.createRef("M_Error");
          tran.set(ref, info);
          // トランザクション内でキャッシュはできない
          // this.cache.push(await ref.get());
          obj.needCache = true;
          obj.ref = ref;
        }else{
          ret = obj.doc;
        }
      }

      const obj = await fireStoreManager.transaction([getfunc], [writefunc]);
      // キャッシュする
      if(obj.needCache){
        const doc = await obj.ref.get();
        this.cache.push(doc);
        ret = doc;
      }
    }
    return ret.data();
  }
}

logger.debug("import FireStoreAPI/Collection/M_Error");

const temp = _.get(root, ["FireStoreAPI", "Collection", "M_Error"]);

const instance = new manager();

if(temp){
    Object.assign(instance, temp);
}

_.set(root, ["FireStoreAPI", "Collection", "M_Error"], instance);

export default instance;