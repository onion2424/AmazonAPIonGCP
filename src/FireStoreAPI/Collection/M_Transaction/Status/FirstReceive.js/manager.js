import root from "../../../../../root.js";
import { _ } from "../../../../../Common/systemCommon.js";
import { initialize } from "./initialize.js";

export class manager {
    constructor() {
        this.initialize = initialize;
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Transaction", "Status", "FirstReceive"], instance);

export default instance;