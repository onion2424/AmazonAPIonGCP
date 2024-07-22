import root from "../../../root.js"
import { _, logger } from "../../../Common/common.js";
import { create } from "./create.js";
import { status } from "./status.js";
import { get } from "./get.js";
import { download } from "./download.js";
import { translate } from "./translate.js";
import { save } from "./save.js";

class manager
{
    constructor()
    {
        this.create = create;
        this.get = get;
        this.status = status;
        this.download = download;
        this.translate = translate;
        this.save = save;
    }
}

logger.debug("import AmazonSpAPI/Reporting/ReportsAPI_v2021");

const instance = new manager();

_.set(root, ["AmazonSpAPI", "Reporting", "ReportsAPI_v2021"], instance);

export default instance;