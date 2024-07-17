import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
export { S_RunningState } from "./class.js";
import collectionManaer from "../manager.js" // import順を考慮


export class manager
{
    constructor(){
      this.create = create;
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "S_RunningState"], instance);

export default instance;