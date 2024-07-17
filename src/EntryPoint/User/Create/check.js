import profileManager from "../../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import authManager from "../../../AmazonAdsAPI/Auth/AccessTokenFromRefreshToken/manager.js"
import feesManager from "../../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import spAuthManager from "../../../AmazonSpAPI/Auth/AccessTokenFromRefreshToken/manager.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import { _, utils, logger } from "../../../Common/systemCommon.js";
import root from "../../Report/import.js"

export default async function check(json) {
    // 日付検証
    if (!utils.tryParseDate(json.sellerStartDate)) {
        logger.warn("【チェック失敗】開始日時の形式が異なる");
        return false;
    }

    // Ads-API 検証
    //auth
    const ads = _.get(json, ["ads_token"]);
    const accessToken = await authManager.get(ads["client_id"], ads["client_secret"], ads["refresh_token"]);
    if (!accessToken) {
        logger.warn("【チェック失敗】ADS-APIのアクセストークが取得不可");
        return false;
    }
    else {
        let date = new Date();
        ads.accessToken = accessToken;
    }

    const profiles = await profileManager.get(ads["client_id"], accessToken.access_token);

    var profile = _.find(profiles, (val => _.get(val, ["accountInfo", "id"]) == json.sellerId));
    if (!profile) {
        logger.warn("【チェック失敗】セラーIDが存在しない");
        return false;
    }

    // SP-API 検証
    // Auth
    const sp = json["sp_token"];
    const spAccessToken = await spAuthManager.get(sp["client_id"], sp["client_secret"], sp["refresh_token"]);
    if (!spAccessToken) {
        logger.warn("【チェック失敗】SP-APIのアクセストークが取得不可");
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
        logger.warn("【チェック失敗】セラーIDが異なる");
        return false;
    }

    // 多重防止
    const docs = await fireStoreManager.getDocs("M_Account", [["sellerId", "==", json.sellerId]]);
    if (docs.length) {
        logger.warn("【チェック失敗】同一のセラーIDが存在");
        return false;
    }

    logger.info("【チェック完了】");

    return true;
}