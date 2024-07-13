import profileManager from "../../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import feedsManager from "../../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import { _, utils, logger } from "../../../Common/systemCommon.js";
import root from "../../../import.js"

export default async function check(json) {
    // 日付検証
    if (!utils.tryParseDate(json.sellerStartDate)) {
        logger.warn("Failed to parse sellerStartDate");
        return false;
    }

    // Ads-API 検証
    //auth
    const ads = _.get(json, ["ads_token"]);
    const authManager = _.get(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const profileManager = _.get(root, ["AmazonAdsAPI", "Accounts", "Profiles"]);
    const accessToken = await authManager.get(ads["client_id"], ads["client_secret"], ads["refresh_token"]);
    if (!accessToken) {
        logger.warn("Failed to get ADS-API access_token");
        return false;
    }
    else {
        let date = new Date();
        ads.accessToken = accessToken;
    }

    const profiles = await profileManager.get(ads["client_id"], accessToken.access_token);

    var profile = _.find(profiles, (val => _.get(val, ["accountInfo", "id"]) == json.sellerId));
    if (!profile) {
        logger.warn("Failed to find sellerId");
        return false;
    }

    // SP-API 検証
    // Auth
    const sp = json["sp_token"];
    const feesManager = _.get(root, ["AmazonSpAPI", "Fees", "GetMyFeesEstimateForASIN"]);
    const spAuthManager = _.get(root, ["AmazonSpAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const spAccessToken = await spAuthManager.get(sp["client_id"], sp["client_secret"], sp["refresh_token"]);
    if (!spAccessToken) {
        logger.warn("Failed to get SP-API access_token");
        return false;
    }
    else {
        let date = new Date();
        sp.accessToken = spAccessToken;
    }

    // Fees
    const fees = await feesManager.get(spAccessToken.access_token);
    const data = _.get(fees, ["payload", "FeesEstimateResult", "FeesEstimateIdentifier"]);
    if (data.SellerId != json.sellerId) {
        logger.warn("Different sellerId");
        return false;
    }

    // 多重防止
    const docs = await fireStoreManager.getDocs("M_Account", [["sellerId", "==", json.sellerId]]);
    if (docs.length) {
        logger.warn("Already exist Account");
        return false;
    }

    logger.info("チェック完了");

    return true;
}