import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";

import { get } from "./get.js"

class manager
{
    constructor()
    {
        this.get = get;
    }
}

logger.debug("import AmazonSpAPI/Reporting/ReportsAPI_v2021");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Accounts", "Profiles"], instance);

export default instance;