import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Transaction, Timestamp } from 'firebase-admin/firestore';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-firebase-adminsdk-semvr-dfdb5719d0.json';


const firebaseApp = initializeApp({ credential: cert(keyFilename) });
const db = getFirestore(firebaseApp, "(default)");

const collection = db.collection("M_Request");
{

    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredPruducts/MergedData/transalte",
                        save: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredPruducts/MergedData/save",
                    },
                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサープロダクト",
        valid: true,
    };
    await docRef.set(data);
}
{

    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredBrands/MergedData/transalte",
                        save: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredBrands/MergedData/save",
                    },
                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサーブランド",
        valid: true,
    };
    await docRef.set(data);
}
{

    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredDisplay/MergedData/transalte",
                        save: "AmazonAdsAPI/Reporting/SponsoredV3/SponsoredDisplay/MergedData/save",
                    },
                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonAdsAPI/Reporting/SponsoredV3/save",
                    status: "SAVE",
                }
            ],
        tag: "スポンサーディスプレイ",
        valid: true,
    };
    await docRef.set(data);
}

{
    let docRef = collection.doc();


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
                    paths:
                    {
                        translate: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/MergedData/transalte",
                        save: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/MergedData/save",
                    },

                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFbaMyiAllInventoryData/save",
                    status: "SAVE",
                }
            ],
        tag: "FBA在庫管理",
        valid: true,
    };
    await docRef.set(data);

}

{
    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/MergedData/transalte",
                        save: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/MergedData/save",
                    },
                    refName: "mergedData",
                settingsJSON: "",
                tag: "マージ用レポート"
                }
            ],
    statuses:
    [
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/create",
            status: "CREATE",
        },
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/status",
            status: "STATUS",
        },
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/get",
            status: "GET",
        },
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/download",
            status: "DOWNLOAD",
        },
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/translate",
            status: "TRANSLATE",
        },
        {
            path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/save",
            status: "SAVE",
        }
    ],
        tag: "全注文レポート",
            valid: true,
    };
await docRef.set(data);
}

{
    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/MergedData/transalte",
                        save: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/MergedData/save",
                    },
                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetSalesAndTrafficReport/save",
                    status: "SAVE",
                }
            ],
        tag: "全注文レポート",
        valid: true,
    };
    await docRef.set(data);
}

{
    let docRef = collection.doc();

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
                    paths:
                    {
                        translate: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/MergedData/transalte",
                        save: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/MergedData/save",
                    },
                    refName: "mergedData",
                    settingsJSON: "",
                    tag: "マージ用レポート"
                }
            ],
        statuses:
            [
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/create",
                    status: "CREATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/status",
                    status: "STATUS",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/get",
                    status: "GET",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/download",
                    status: "DOWNLOAD",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/translate",
                    status: "TRANSLATE",
                },
                {
                    path: "AmazonSpApi/Reporting/ReportAPI_v2021/GetMerchantListingsAllData/save",
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