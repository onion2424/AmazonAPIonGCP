import root from "../../../root.js"
import { _ } from "../../../Common/systemCommon.js";
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

_.set(root, ["AmazonAdsAPI", "Reporting", "SponsoredAdsV3"], new manager());

export default root.AmazonAdsAPI.Reporting.SponsoredAdsV3;