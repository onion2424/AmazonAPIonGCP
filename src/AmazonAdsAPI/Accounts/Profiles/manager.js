import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";

import { get } from "./get.js"

class manager
{
    constructor()
    {
        this.get = get;
    }
}

_.set(root, ["AmazonAdsAPI", "Accounts", "Profiles"], new manager());

export default root.AmazonAdsAPI.Accounts.Profiles;