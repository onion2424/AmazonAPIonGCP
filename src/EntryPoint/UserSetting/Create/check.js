import profileManager from "../../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import * as get from "../../../AmazonAdsAPI/Auth/AccessTokenFromRefreshToken/get.js"
import feesManager from "../../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import * as spget from "../../../AmazonSpAPI/Auth/AccessTokenFromRefreshToken/get.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import { _, utils, logger } from "../../../Common/common.js";

export default async function check(json) {
    // 日付検証
    if (!utils.tryParseDate(json.sellerStartDate)) {
        logger.warn("[チェック失敗][開始日時の形式異常]");
        return false;
    }

    // Ads-API 検証
    //auth
    const ads = _.get(json, ["ads_token"]);
    const accessToken = await get.get(ads["client_id"], ads["client_secret"], ads["refresh_token"]);
    if (!accessToken) {
        logger.warn("[チェック失敗][ADS-API][アクセストークン取得失敗]");
        return false;
    }
    else {
        ads.accessToken = accessToken;
    }

    const profiles = await profileManager.get(ads["client_id"], accessToken.access_token);

    var profile = _.find(profiles, (val => _.get(val, ["profileId"]) == json.profileId));
    if (!profile || profile.accountInfo.id != json.sellerId) {
        logger.warn("[チェック失敗][ADS-API][プロフィールID不整合]");
        return false;
    }

    // timezoneをセット
    json.timezone = profile.timezone;

    // SP-API 検証
    // Auth
    const sp = json["sp_token"];
    const spAccessToken = await spget.get(sp["client_id"], sp["client_secret"], sp["refresh_token"]);
    if (!spAccessToken) {
        logger.warn("[チェック失敗][SP-API][アクセストークン取得失敗]");
        return false;
    }
    else {
        sp.accessToken = spAccessToken;
    }

    // Fees
    const fees = await feesManager.get(spAccessToken.access_token);
    const data = _.get(fees, ["payload", "FeesEstimateResult", "FeesEstimateIdentifier"]);
    if (data.SellerId != json.sellerId) {
        logger.warn("[チェック失敗][SP-API][セラーID不整合]");
        return false;
    }

    // 多重防止
    const docs = await fireStoreManager.getDocs("M_Account", [["profileId", "==", json.sellerId]]);
    if (docs.length) {
        logger.warn("[チェック失敗][プロフィール重複]");
        return false;
    }

    logger.info(`[チェック完了]`);

    return true;
}