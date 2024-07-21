import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { onSystemError, onFireStoreError, onRequestError } from "./onError.js";
export { L_Error } from "./class.js"
import collectionManaer from "../manager.js" // import順を考慮


export class manager {
  constructor() {
    this.create = create;
    this.onSystemError = async (error, doc) => onSystemError(this.job, this.mode, error, doc);
    this.onFireStoreError = async (error, doc) => onFireStoreError(this.job, this.mode, error, doc);
    this.onRequestError = async (error, doc) => onRequestError(this.job, this.mode, error, doc);
    this.job = "";
  }
  /**
   * 
   * @param {string} job 
   * @param {string} mode WRITE|SAVE
   */
  initialize(job, mode){
    this.job = job;
    this.mode = mode;
  }
}

logger.debug("import FireStoreAPI/Collection/L_Error");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "L_Error"], instance);

export default instance;