import root from "../../../root.js"
import { _, logger } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
export {D_Schedule} from "./class.js";
import collectionManaer from "../manager.js" // import順を考慮


export class manager
{
    constructor(){
      this.create = create;
    }
}

logger.debug("import FireStoreAPI/Collection/D_Schedule");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "D_Schedule"], instance);

export default instance;