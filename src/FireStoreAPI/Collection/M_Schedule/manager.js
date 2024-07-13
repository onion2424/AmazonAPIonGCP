import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
import { caching } from "./caching.js";
export {M_Account} from "./class.js";


export class manager
{
    constructor(){
      this.create = create;
      this.caching = caching;
      /**
       * @type {M_Account}
       */
      this.cache = [];
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Account"], instance);

export default instance;