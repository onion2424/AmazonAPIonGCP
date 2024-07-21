import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { status } from "./status.js";
import { download } from "./download.js";
import { translate } from "./translate.js";

class manager
{
    constructor()
    {
        this.create = create;
        this.status = status;
        this.download = download;
        this.translate = translate;
        //this.save = save;
    }
}

logger.debug("import AmazonAdsAPI/Reporting/SponsoredAdsV3");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Reporting", "SponsoredAdsV3"], instance);

export default instance;