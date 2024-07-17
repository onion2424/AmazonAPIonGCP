import root from "../../../root.js"
import { _, logger } from "../../../Common/systemCommon.js";
import { create } from "./create.js";
import { status } from "./status.js";
import { get } from "./get.js";
import { download } from "./download.js";
import { getDate } from "./date.js";

class manager
{
    constructor()
    {
        this.create = create;
        this.get = get;
        this.status = status;
        this.download = download;
        this.getDate = getDate;
    }
}

logger.debug("import AmazonSpAPI/Reporting/ReportsAPI_v2021");

const instance = new manager();

_.set(root, ["AmazonSpAPI", "Reporting", "ReportsAPI_v2021"], instance);

export default instance;