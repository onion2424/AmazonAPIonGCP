import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
import { M_Transaction } from "./class.js";
import { caching } from "./caching.js";

export class manager
{
    constructor(){
      this.create = create;
      this.caching = caching;
      /**
       * @type {[M_Transaction]}
       */
      this.cache = [];
    }
}

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Transaction"], instance);

export default instance;