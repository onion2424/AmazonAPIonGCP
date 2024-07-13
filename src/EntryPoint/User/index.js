import { _, utils, dayjs, logger } from "../../Common/systemCommon.js"; { }
import root from "../../import.js";
import factoryMethod from "./factory.js"
import * as path from "path";
import storageManager from "./../../GoogleCloudStorageAPI/manager.js"

async function run() {

    // まずファイルを探す
    // amazon-api-report/Environment/Firestore/user/
    var list = await storageManager.listFilesByPrefix("Environment/FireStore/UserSetting/", "/");

    // ループする
    // -- 同期処理の為for文
    for await (const file of list) {
        if (path.extname(file.name) != ".json") continue;

        const fileName = path.basename(file.name);

        const contents = await storageManager.downloadIntoMemory(file.name);
        const json = JSON.parse(contents.toString());
        const manager = factoryMethod(file.name, json);
        if(!manager)
            return;
        let ret = await manager.run(json);

        if(ret){
            // _oldに入れる
            await storageManager.moveFile(file.name, file.name.replace(fileName, `_old/${fileName}`));
        }
        return;
    }

    logger.warn("ファイルが存在しません。");

    // Typeを見る
    // CREATE|UPDATE|DELETE

    // CREATEの場合
    // Ads:SellerIDで一意 SP:SellerID+marketPlaceIdsで一意
    // Auth⇒Profile⇒Auth⇒Fees
    // CREATE

    // UPDATEの場合
    // documentIDの有無
    // SellerIDが不変なこと(これがキー？)
    // Auth⇒Profile⇒Auth⇒Fees
    // UPDATE

    // DELETEの場合
    // documentIDの有無
    // SellerIDが不変なこと
    // DELETE


    // それ以外の場合エラーで終了
}

await run();

//https://qiita.com/zaru/items/45574cf5919441953b2e

// --
