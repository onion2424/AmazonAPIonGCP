import root from "../../../root.js"
import { _, logger } from "../../../Common/systemCommon.js";
import { get } from "./get.js";

class manager
{
    constructor()
    {
        this.get = get;
    }
}

logger.debug("import AmazonSpAPI/Fees/GetMyFeesEstimateForASIN")

const instance = new manager();

_.set(root, ["AmazonSpAPI", "Fees", "GetMyFeesEstimateForASIN"], instance);

export default instance;