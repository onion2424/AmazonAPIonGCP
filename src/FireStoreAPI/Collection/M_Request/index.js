import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Transaction, Timestamp } from 'firebase-admin/firestore';
import FirestoreManager from "../../manager.js"
import { systemInfo } from '../../../Common/common.js';

{

    let docRef = await FirestoreManager.createRef("M_Request");

    let data = {
        details:
            [
                {
                    body: {
                        "name": "",
                        "startDate": "",
                        "endDate": "",
                        "configuration": {
                            "adProduct": "SPONSORED_PRODUCTS",
                            "groupBy": ["advertiser"],
                            "columns": [
                                "date", "adGroupId", "campaignId", "advertisedAsin", "impressions",
                                "clicks", "cost", "costPerClick", "spend", "advertisedSku", "purchases1d",
                                "purchases7d", "purchases14d", "purchases30d", "purchasesSameSku1d", "purchasesSameSku7d",
                                "purchasesSameSku14d", "purchasesSameSku30d", "unitsSoldClicks1d", "unitsSoldClicks7d", "unitsSoldClicks14d",
                                "unitsSoldClicks30d", "sales1d", "sales7d", "sales14d", "sales30d", "attributedSalesSameSku1d",
                                "attributedSalesSameSku7d", "attributedSalesSameSku14d", "attributedSalesSameSku30d", "unitsSoldSameSku1d", "unitsSoldSameSku7d",
                                "unitsSoldSameSku14d", "unitsSoldSameSku30d",
                            ],
                            "reportTypeId": "spAdvertisedProduct",
                            "timeUnit": "DAILY",
                            "format": "GZIP_JSON"
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 : 60,
                        },
                        save:
                        {
                            fileName: "SPAdvertisedProduct.json",
                            tableName: "SPAdvertisedProduct",
                            translaters:[
                                "gunzip", "ndjson",
                            ],
                        }
                    },
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサープロダクト",
        valid: true,
    };
    await docRef.set(data);
}
{

    let docRef = await FirestoreManager.createRef("M_Request");

    let data = {
        details:
            [
                {
                    body: {
                        "name": "",
                        "startDate": "",
                        "endDate": "",
                        "configuration": {
                            "adProduct": "SPONSORED_BRANDS",
                            "groupBy": ["campaign"],
                            "columns": [
                                "date", "campaignId", "addToCart", "addToCartClicks", "brandedSearches",
                                "brandedSearchesClicks", "campaignBudgetAmount", "campaignBudgetCurrencyCode", "campaignBudgetType", "campaignName",
                                "campaignStatus", "clicks", "cost", "costType", "detailPageViews",
                                "detailPageViewsClicks", "impressions", "newToBrandDetailPageViews", "newToBrandDetailPageViewsClicks", "newToBrandPurchases",
                                "newToBrandPurchasesClicks", "newToBrandSales", "newToBrandSalesClicks", "newToBrandUnitsSold", "newToBrandUnitsSoldClicks",
                                "purchases", "purchasesClicks", "purchasesPromoted", "sales", "salesClicks",
                                "salesPromoted", "topOfSearchImpressionShare", "unitsSold", "unitsSoldClicks", "video5SecondViews",
                                "videoCompleteViews", "videoFirstQuartileViews", "videoMidpointViews", "videoThirdQuartileViews", "videoUnmutes",
                                "viewableImpressions"
                            ],
                            "reportTypeId": "sbCampaigns",
                            "timeUnit": "DAILY",
                            "format": "GZIP_JSON"
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 : 60,
                        },
                        save:
                        {
                            fileName: "SBCampaigns.json",
                            tableName: "SBCampaigns",
                            translaters:[
                                "gunzip", "ndjson",
                            ],
                        }
                    },
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサーブランド",
        valid: true,
    };
    await docRef.set(data);
}
{

    let docRef = await FirestoreManager.createRef("M_Request");


    let data = {
        details:
            [
                {
                    body: {
                        "name": "",
                        "startDate": "",
                        "endDate": "",
                        "configuration": {
                            "adProduct": "SPONSORED_DISPLAY",
                            "groupBy": ["advertiser"],
                            "columns": [
                                "date", "adGroupId", "campaignId", "addToCart", "addToCartClicks",
                                "brandedSearches", "brandedSearchesClicks", "clicks", "cost", "detailPageViews",
                                "detailPageViewsClicks", "impressions", "impressionsFrequencyAverage",
                                "impressionsViews", "newToBrandDetailPageViewClicks", "newToBrandDetailPageViews", "newToBrandDetailPageViewViews", "newToBrandPurchases",
                                "newToBrandPurchasesClicks", "newToBrandSales", "newToBrandSalesClicks",
                                "newToBrandUnitsSold", "newToBrandUnitsSoldClicks", "promotedAsin", "purchases", "purchasesClicks",
                                "purchasesPromotedClicks", "sales", "salesClicks", "salesPromotedClicks", "unitsSold",
                                "unitsSoldClicks", "videoCompleteViews", "videoFirstQuartileViews", "videoMidpointViews", "videoThirdQuartileViews",
                                "videoUnmutes", "promotedSku"
                            ],
                            "reportTypeId": "sdAdvertisedProduct",
                            "timeUnit": "DAILY",
                            "format": "GZIP_JSON"
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 : 60,
                        },
                        save:
                        {
                            fileName: "SDAdvertisedProduct.json",
                            tableName: "SDAdvertisedProduct",
                            translaters:[
                                "gunzip", "ndjson",
                            ],
                        }
                    },
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredAdsV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサーディスプレイ",
        valid: true,
    };
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createRef("M_Request");


    let data = {
        details:
            [
                {
                    body:
                    {
                        "reportType": "GET_FBA_MYI_ALL_INVENTORY_DATA",
                        "dataStartTime": "",
                        "dataEndTime": "",
                        "marketplaceIds": [],
                        "reportOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:{
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1],
                            dateBack: systemInfo.isTest() ? 1 : -1,
                        },
                        save:
                        {
                            fileName: "GetFbaMyiAllInventoryData.csv",
                            tableName: "GetFbaMyiAllInventoryData",
                            translaters:[
                                "decodeSJIS", "encodeUTF-8",
                            ],
                        }
                    },
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/save",
                    status: "SAVE",
                }
            ],
        tag: "FBA在庫管理",
        valid: true,
    };
    await docRef.set(data);

}

{
    let docRef = await FirestoreManager.createRef("M_Request");


    let data = {
        details:
            [
                {
                    body:
                    {
                        "reportType": "GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL",
                        "dataStartTime": "",
                        "dataEndTime": "",
                        "marketplaceIds": [],
                        "reportOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 : 0,
                        },
                        save:
                        {
                            fileName: "GetFlatFileAllOrdersDataByOrderDateGeneral.csv",
                            tableName: "GetFlatFileAllOrdersDataByOrderDateGeneral",
                            translaters:[
                                "decodeSJIS", "encodeUTF-8",
                            ],
                        }
                    },
                    fileName: "GetFlatFileAllOrdersDataByOrderDateGeneral.csv",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/save",
                    status: "SAVE",
                }
            ],
        tag: "全注文レポート",
        valid: true,
    };
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createRef("M_Request");

    let data = {
        details:
            [
                {
                    body:
                    {
                        "reportType": "GET_SALES_AND_TRAFFIC_REPORT",
                        "dataStartTime": "",
                        "dataEndTime": "",
                        "marketplaceIds": [],
                        "reportOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 : 0,
                        },
                        save:
                        {
                            fileName: "GetSalesAndTrafficReport.json",
                            tableName: "GetSalesAndTrafficReport",
                            translaters:[
                                "getSalesAndTrafficReport",
                            ],
                        }

                    },
                    fileName: "GetSalesAndTrafficReport.json",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/save",
                    status: "SAVE",
                }
            ],
        tag: "全注文レポート",
        valid: true,
    };
    await docRef.set(data);
}

{
    let docRef = await FirestoreManager.createRef("M_Request");

    let data = {
        details:
            [
                {
                    body:
                    {
                        "reportType": "GET_MERCHANT_LISTINGS_ALL_DATA",
                        "dataStartTime": "",
                        "dataEndTime": "",
                        "marketplaceIds": [],
                        "reportOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                            granularity: "DAY",
                            spans: [1, 2, 3, 4, 5, 6, 7, 30],
                            dateback: systemInfo.isTest() ? 1 :  1,
                        },
                        save:
                        {
                            fileName: "GetMerchantListingsAllData.csv",
                            tableName: "GetMerchantListingsAllData",
                            translaters:[
                                "decodeSJIS", "encodeUTF-8", "getMerchantListingsAllData",
                            ],
                        }
                    },
                    fileName: "GetMerchantListingsAllData.csv",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/save",
                    status: "SAVE",
                }
            ],
        tag: "全ての出品商品のレポート",
        valid: true,
    };
    await docRef.set(data);
}

// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction