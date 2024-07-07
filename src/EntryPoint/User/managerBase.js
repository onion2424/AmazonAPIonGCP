export default class managerBase {
    constructor(check, save) {
        this.check = check;
        this.save = save;
    }

    async run(json) {
        if (!await this.check(json)) {
            console.log("Check Failed, Need to check over;");
            return;
        }
        if (!await this.save(json)) {
            console.log("Save Failed, Something went wrong;");
            return;
        }

        console.log("Complete Saved!");
    }
}