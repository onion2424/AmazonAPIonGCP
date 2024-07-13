import { _, logger } from "../../Common/systemCommon.js";
export default class managerBase {
    constructor(check, save) {
        this.check = check;
        this.save = save;
    }

    async run(json) {
        if (!await this.check(json)) {
            logger.warn("Check Failed, Need to check over;");
            return false;
        }
        if (!await this.save(json)) {
            logger.warn("Save Failed, Something went wrong;");
            return false;
        }

        logger.info("Complete!");
        return true;
    }
}