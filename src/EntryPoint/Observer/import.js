// Status系をimport
import FireStoreAPICollectionM_TransactionStatusFirstReport from "../../FireStoreAPI/Collection/M_Transaction/Status/FirstReport/manager.js"
import FireStoreAPICollectionM_TransactionStatusRegularReport from "../../FireStoreAPI/Collection/M_Transaction/Status/RegularReport/manager.js"
import AmazonSpAPIReportingReportsAPI_v2021SettingsDate from "../../AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/dateManager.js"
import AmazonAdsAPIReportingSponsoredAdsV3SettingsDate from "../../AmazonAdsAPI/Reporting/SponsoredAdsV3/Settings/dateManager.js"

import root from "../../root.js"
export default root;

// 基本情報
export const version = "1.0.0.0";
export const job = "OBSERVER";