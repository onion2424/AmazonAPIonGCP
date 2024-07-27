import root from "../../../../root.js"
import { _, logger } from "../../../../Common/common.js";
import { M_Error } from "../manager.js"
import { D_ReportRequest } from "../../D_ReportRequest/class.js";
import { M_Request } from "../../M_Request/class.js";


export class manager
{
    constructor(){
    }

    /**
     * 
     * @param {M_Error} error 
     * @param {M_Error} info 
     * @param {D_ReportRequest} drequest
     * @returns 
     */
    structureEqual(error, info, drequest){
        return error.path == info.path 
            && error.status == info.status
            && error.response == info.response;
    }
    /**
     * 
     * @param {M_Error} error キャッシュ
     * @param {M_Error} info 
     * @param {D_ReportRequest} drequest
     * @returns 
     */
    replaceEqual(error, info, drequest){
        const errorText = error.response;
        const infoText = info.response;
        for(const regStr in error.regs){
            const reg = new RegExp(regStr);
            errorText = errorText.replace(reg, "***");
            infoText = infoText.replace(reg, "***");
        }
        return errorText == infoText;
    }
}

logger.debug("import FireStoreAPI/Collection/M_Error/Equal");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "M_Error", "Equal"], instance);

export default instance;