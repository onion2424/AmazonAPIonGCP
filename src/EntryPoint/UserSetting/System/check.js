import profileManager from "../../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import * as get from "../../../AmazonAdsAPI/Auth/AccessTokenFromRefreshToken/get.js"
import feesManager from "../../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import * as spget from "../../../AmazonSpAPI/Auth/AccessTokenFromRefreshToken/get.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import { _, utils, logger } from "../../../Common/common.js";

export default async function check(json) {
    // SP-API 検証
    // Auth
    const sp = json["sp_token"];
    const spAuthRes = await spget.get(sp["client_id"], sp["client_secret"], sp["refresh_token"]);
    if (spAuthRes.ok != "ok") {
        logger.warn("[チェック失敗][SP-API][アクセストークン取得失敗]");
        return false;
    }
    else {
        sp.accessToken = spAuthRes.token;
    }

    logger.info(`[チェック完了]`);

    return true;
}