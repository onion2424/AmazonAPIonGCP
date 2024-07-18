import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { caching } from "./caching.js";
export { M_Transaction } from "./class.js";
import collectionManaer from "../manager.js" // import順を考慮

export class manager
{
    constructor(){
      this.create = create;
      /**
       * @type {[FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>]}
       */
      this.cache = [];
    }
    
    async caching()
    {
      if(this.cached) return;
      logger.debug("M_Transaction：キャッシング開始");
      this.cache = await caching();
      this.cached = true;
      logger.debug("M_Transaction：キャッシング完了");
    }
}

logger.debug("import FireStoreAPI/Collection/M_Transaction");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Transaction"], instance);

export default instance;