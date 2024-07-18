import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
export { D_Token } from "./class.js";
import collectionManaer from "../manager.js" // import順を考慮


export class manager
{
    constructor(){
      this.create = create;
    }
}

logger.debug("import FireStoreAPI/Collection/D_Token");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "D_Token"], instance);

export default instance;