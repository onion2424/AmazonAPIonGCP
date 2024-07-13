import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
import { create } from "./create.js";

export {M_Account} from "./class.js";


export class manager
{
    constructor(){
      this.create = create;
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Transaction"], instance);

export default instance;