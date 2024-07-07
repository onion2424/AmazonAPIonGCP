import { _ } from "../../Common/systemCommon.js"; { }
import root from "../../import.js";
import factoryMethod from "./factory.js"
import * as path from "path";


async function run() {

    // まずファイルを探す
    // amazon-api-report/Environment/Firestore/user/
    const storageManager = _.get(root, ["GoogleCloudStorageAPI"]);
    var list = await storageManager.listFilesByPrefix("/Environment/FireStore/UserSetting/");

    // ループする
    // -- 同期処理の為for文
    for await (const file of list) {
        if (path.extname(file.name) != ".json") continue;

        const contents = await storageManager.downloadIntoMemory(file.name, false);
        const json = JSON.parse(contents.toString());
        const manager = factoryMethod(file.name, json);

        let ret = false;
        if(!!manager)
            ret = await manager.run(json);

        if(ret)
            console.log("await success!");
        return;
    }

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
