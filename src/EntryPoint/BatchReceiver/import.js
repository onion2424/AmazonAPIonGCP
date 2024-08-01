// アマゾンAPI系をインポート
import AmazonAdsAPIAccountsProfilesmanager from "../../AmazonAdsAPI/Accounts/Profiles/manager.js"
import AmazonAdsAPIAuthAccessTokenFromRefreshTokenmanager from "../../AmazonAdsAPI/Auth/AccessTokenFromRefreshToken/manager.js"
import AmazonAdsAPIReportingSponsoredAdsV3 from "../../AmazonAdsAPI/Reporting/SponsoredAdsV3/manager.js"
import AmazonSpAPIAuthAccessTokenFromRefreshToken from "../../AmazonSpAPI/Auth/AccessTokenFromRefreshToken/manager.js"
import AmazonSpAPIFeedsGetMyFeesEstimateForASIN from "../../AmazonSpAPI/Fees/GetMyFeesEstimateForASIN/manager.js"
import AmazonSpAPIReportingReportsAPI_v2021 from "../../AmazonSpAPI/Reporting/ReportsAPI_v2021/manager.js"

// HandleとEqualをインポート
import FireStoreAPICollectionM_ErrorEqual from "../../FireStoreAPI/Collection/M_Error/Equal/manager.js"
import FireStoreAPICollectionM_ErrorHandle from "../../FireStoreAPI/Collection/M_Error/Handle/manager.js"

import root from "../../root.js"
export default root;

// 基本情報
export const version = "1.0.0.0";
export const job = "BATCHRECEIVER";