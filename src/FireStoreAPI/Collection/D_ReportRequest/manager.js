import root from "../../../root.js"
import { _, logger } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
import collectionManaer from "../manager.js" // import順を考慮

export { D_ReportRequest } from "./class.js";


export class manager
{
    constructor(){
      this.create = create;
    }
}

logger.debug("import FireStoreAPI/Collection/D_ReportRequest");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "D_ReportRequest"], instance);

export default instance;