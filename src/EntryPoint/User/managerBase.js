import { _, logger } from "../../Common/systemCommon.js";
export default class managerBase {
    constructor(check, save) {
        this.check = check;
        this.save = save;
    }

    async run(json) {
        if (!await this.check(json)) {
            return false;
        }
        if (!await this.save(json)) {
            return false;
        }

        logger.info("【アカウント作成完了】");
        return true;
    }
}