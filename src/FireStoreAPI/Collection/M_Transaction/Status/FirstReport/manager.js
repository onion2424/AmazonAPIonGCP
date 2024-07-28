import root from "../../../../../root.js";
import { _, logger } from "../../../../../Common/common.js";
import { initialize } from "./initialize.js";
import { finalize } from "./finalize.js"
import M_TransactionManager from "../../manager.js" // import順を考慮

export class manager {
    constructor() {
        this.initialize = initialize;
        this.finalize = finalize;
    }
}

logger.debug("import FireStoreAPI/Collection/M_Transaction/Status/FirstReport");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Transaction", "Status", "FirstReport"], instance);

export default instance;