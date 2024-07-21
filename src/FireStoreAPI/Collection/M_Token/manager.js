import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { caching } from "./caching.js"
export { M_Token } from "./class.js";
import collectionManaer from "../manager.js" // import順を考慮


export class manager
{
    constructor(){
      this.create = create;
      this.cache = [];
      this.cached = false;
    }

    async caching()
    {
      if(this.cached) return;
      logger.debug("M_Token：キャッシング開始");
      this.cache = await caching();
      this.cached = true;
      logger.debug("M_Token：キャッシング完了");
    }
}

logger.debug("import FireStoreAPI/Collection/M_Token");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Token"], instance);

export default instance;