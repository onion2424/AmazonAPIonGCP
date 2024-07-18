import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { get } from "./get.js";

class manager{
    constructor(){
        this.get = get;
    }
}

logger.debug("import AmazonAdsAPI/Auth/AccessTokenFromRefreshToken");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"], instance);

export default instance;