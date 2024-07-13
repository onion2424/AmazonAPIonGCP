import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
import { create } from "./create.js";

export { D_ReportRequest } from "./class.js";


export class manager
{
    constructor(){
      this.create = create;
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "D_ReportRequest"], instance);

export default instance;