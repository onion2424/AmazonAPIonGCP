import profileManager from "../../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import feedsManager from "../../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import { _, utils } from "../../../Common/systemCommon.js";
import root from "../../../import.js"

export default async function check(json) {
    // 日付検証
    if (!utils.tryParseDate(json.sellerStartDate)) {
        console.log("Failed to parse sellerStartDate");
        return false;
    }

    // Ads-API 検証
    //auth
    const ads = _.get(json, ["ADS-API"]);
    const authManager = _.get(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const profileManager = _.get(root, ["AmazonAdsAPI", "Accounts", "Profiles"]);
    const accessToken = await authManager.get(ads["client_id"], ads["client_secret"], ads["refresh_token"]);
    console.log(accessToken);
    if (!accessToken) {
        console.log("Failed to get ADS-API access_token");
        return false;
    }
    else {
        let date = new Date();
        ads.tokenInfo = accessToken;
    }

    const profiles = await profileManager.get(ads["client_id"], accessToken.access_token);

    var profile = _.find(profiles, (val => _.get(val, ["accountInfo", "id"]) == json.sellerId));
    if (!profile) {
        console.log("Failed to find SellerId");
        return false;
    }
    console.log(profile);

    // SP-API 検証
    // Auth
    const sp = json["SP-API"];
    const feesManager = _.get(root, ["AmazonSpAPI", "Fees", "GetMyFeesEstimateForASIN"]);
    const spAuthManager = _.get(root, ["AmazonSpAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const spAccessToken = await spAuthManager.get(sp["client_id"], sp["client_secret"], sp["refresh_token"]);
    if (!spAccessToken) {
        console.log("Failed to get SP-API access_token");
        return false;
    }
    else {
        let date = new Date();
        //console.log(process.env.TZ);
        //date.setSeconds(date.getSeconds() + spAccessToken["expires_in"]);
        sp.tokenInfo = accessToken;
    }

    // Fees
    const fees = await feesManager.get(spAccessToken.access_token);
    const data = _.get(fees, ["payload", "FeesEstimateResult", "FeesEstimateIdentifier"]);
    console.log(data);
    if (data.SellerId != json.sellerId) {
        console.log("Different SellerId");
    }

    return true;
}