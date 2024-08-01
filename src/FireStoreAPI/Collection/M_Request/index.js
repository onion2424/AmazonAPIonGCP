import FirestoreManager from "../../manager.js"

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
                        },
                        save:
                        {
                            fileName: "SPAdvertisedProduct.json",
                            tableName: "SPAdvertisedProduct",
                            translaters: [
                                "gunzip", "spAdvertisedProduct",
                            ],
                            tableOptions: {
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldSameSku14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "impressions",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesSameSku30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldSameSku30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "adGroupId",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldSameSku7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesSameSku7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "advertisedAsin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "advertisedSku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldSameSku1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "attributedSalesSameSku30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "cost",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignId",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "spend",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases30d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "attributedSalesSameSku7d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "attributedSalesSameSku14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesSameSku14d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesSameSku1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "attributedSalesSameSku1d",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "costPerClick",
                                        "type": "BIGNUMERIC"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        },
                        save:
                        {
                            fileName: "SBCampaigns.json",
                            tableName: "SBCampaigns",
                            translaters: [
                                "gunzip", "sbCampaigns",
                            ],
                            tableOptions: {
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignId",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "addToCart",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "addToCartClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "brandedSearches",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "brandedSearchesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignBudgetAmount",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignBudgetCurrencyCode",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignBudgetType",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignName",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignStatus",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "cost",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "costType",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "detailPageViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "detailPageViewsClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "impressions",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandDetailPageViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandDetailPageViewsClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandPurchases",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandPurchasesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandSales",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandSalesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandUnitsSold",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandUnitsSoldClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesPromoted",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "salesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "salesPromoted",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "topOfSearchImpressionShare",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSold",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "video5SecondViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoCompleteViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoFirstQuartileViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoMidpointViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoThirdQuartileViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoUnmutes",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "viewableImpressions",
                                        "type": "BIGNUMERIC"
                                    },
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        },
                        save:
                        {
                            fileName: "SDAdvertisedProduct.json",
                            tableName: "SDAdvertisedProduct",
                            translaters: [
                                "gunzip", "sdAdvertisedProduct",
                            ],
                            tableOptions:{
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "salesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoFirstQuartileViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoMidpointViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "impressionsViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoCompleteViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandDetailPageViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "impressions",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "campaignId",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "salesPromotedClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchases",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoThirdQuartileViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandDetailPageViewViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandUnitsSold",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "promotedAsin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "videoUnmutes",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandPurchasesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "addToCart",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "addToCartClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandDetailPageViewClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "impressionsFrequencyAverage",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandUnitsSoldClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandSales",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "adGroupId",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesPromotedClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandPurchases",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "brandedSearchesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "promotedSku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSold",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "brandedSearches",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "detailPageViews",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "unitsSoldClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "newToBrandSalesClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "detailPageViewsClicks",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "cost",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchasesClicks",
                                        "type": "BIGNUMERIC"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        "reporttableOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date: {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                        },
                        save:
                        {
                            fileName: "GetFbaMyiAllInventoryData.json",
                            tableName: "GetFbaMyiAllInventoryData",
                            translaters: [
                                "decodeSJIS", "encodeUTF-8", "GetFbaMyiAllInventoryData"
                            ],
                            tableOptions:{
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "fnsku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product-name",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "condition",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "your-price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "mfn-listing-exists",
                                        "type": "BOOLEAN"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "mfn-fulfillable-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-listing-exists",
                                        "type": "BOOLEAN"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-warehouse-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-fulfillable-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-unsellable-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-reserved-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-total-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "per-unit-volume",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-inbound-working-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-inbound-shipped-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-inbound-receiving-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-researching-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-reserved-future-supply",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn-future-supply-buyable",
                                        "type": "BIGNUMERIC"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        "reporttableOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                        },
                        save:
                        {
                            fileName: "GetFlatFileAllOrdersDataByOrderDateGeneral.json",
                            tableName: "GetFlatFileAllOrdersDataByOrderDateGeneral",
                            translaters: [
                                "decodeSJIS", "encodeUTF-8", "GetFlatFileAllOrdersDataByOrderDateGeneral"
                            ],
                            tableOptions:{
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    }, {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "amazon-order-id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "merchant-order-id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchase-date",
                                        "type": "TIMESTAMP"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "last-updated-date",
                                        "type": "TIMESTAMP"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "order-status",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "fulfillment-channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales-channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "order-channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-service-level",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product-name",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-status",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "currency",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-tax",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "shipping-price",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "shipping-tax",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "gift-wrap-price",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "gift-wrap-tax",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-promotion-discount",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-promotion-discount",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-city",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-state",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-postal-code",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship-country",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "promotion-ids",
                                        "type": "STRING"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
                        }
                    },
                    fileName: "GetFlatFileAllOrdersDataByOrderDateGeneral.json",
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        "reporttableOptions": {
                            "asinGranularity": "CHILD",
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                        },
                        save:
                        {
                            fileName: "GetSalesAndTrafficReport.json",
                            tableName: "GetSalesAndTrafficReport",
                            translaters: [
                                "gunzip", "getSalesAndTrafficReport",
                            ],
                        },
                        tableOptions:{
                            schema: [
                                {
                                    "mode": "Required",
                                    "name": "partition_date",
                                    "type": "DATE"
                                }, {
                                    "mode": "Required",
                                    "name": "cluster_asin",
                                    "type": "STRING"
                                },
                                {
                                    "fields": [
                                        {
                                            "mode": "REPEATED",
                                            "name": "marketplaceIds",
                                            "type": "STRING"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "dataEndTime",
                                            "type": "DATE"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "dataStartTime",
                                            "type": "DATE"
                                        },
                                        {
                                            "fields": [
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "asinGranularity",
                                                    "type": "STRING"
                                                },
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "dateGranularity",
                                                    "type": "STRING"
                                                }
                                            ],
                                            "mode": "NULLABLE",
                                            "name": "reporttableOptions",
                                            "type": "RECORD"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "reportType",
                                            "type": "STRING"
                                        }
                                    ],
                                    "mode": "NULLABLE",
                                    "name": "reportSpecification",
                                    "type": "RECORD"
                                },
                                {
                                    "fields": [
                                        {
                                            "mode": "NULLABLE",
                                            "name": "unitSessionPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "buyBoxPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppPageViewsPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "pageViewsPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "buyBoxPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserPageViewsPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserPageViewsPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserSessions",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppPageViewsPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "pageViewsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "pageViewsPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserSessionPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "pageViews",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppPageViewsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "sessionPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "unitSessionPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserSessionPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppPageViews",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserPageViews",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "sessionsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "sessionPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppSessions",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppSessionPercentageB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppSessionsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "sessions",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserPageViewsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "mobileAppSessionPercentage",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "browserSessionsB2B",
                                            "type": "BIGNUMERIC"
                                        }
                                    ],
                                    "mode": "NULLABLE",
                                    "name": "trafficByAsin",
                                    "type": "RECORD"
                                },
                                {
                                    "fields": [
                                        {
                                            "mode": "NULLABLE",
                                            "name": "totalOrderItemsB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "fields": [
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "currencyCode",
                                                    "type": "STRING"
                                                },
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "amount",
                                                    "type": "BIGNUMERIC"
                                                }
                                            ],
                                            "mode": "NULLABLE",
                                            "name": "orderedProductSalesB2B",
                                            "type": "RECORD"
                                        },
                                        {
                                            "fields": [
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "currencyCode",
                                                    "type": "STRING"
                                                },
                                                {
                                                    "mode": "NULLABLE",
                                                    "name": "amount",
                                                    "type": "BIGNUMERIC"
                                                }
                                            ],
                                            "mode": "NULLABLE",
                                            "name": "orderedProductSales",
                                            "type": "RECORD"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "unitsOrderedB2B",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "totalOrderItems",
                                            "type": "BIGNUMERIC"
                                        },
                                        {
                                            "mode": "NULLABLE",
                                            "name": "unitsOrdered",
                                            "type": "BIGNUMERIC"
                                        }
                                    ],
                                    "mode": "NULLABLE",
                                    "name": "salesByAsin",
                                    "type": "RECORD"
                                },
                                {
                                    "mode": "NULLABLE",
                                    "name": "childAsin",
                                    "type": "STRING"
                                },
                                {
                                    "mode": "NULLABLE",
                                    "name": "parentAsin",
                                    "type": "STRING"
                                }
                            ],
                            timePartitioning: {
                                type: 'DAY',
                                field: 'partition_date',
                            },
                            clustering: {
                                fields: ['cluster_asin'],
                            },
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
        tag: "ビジネスレポート",
        valid: true,
    };
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
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
                        "reporttableOptions": {
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate",
                        },
                        save:
                        {
                            fileName: "GetMerchantListingsAllData.json",
                            tableName: "GetMerchantListingsAllData",
                            translaters: [
                                "decodeSJIS", "encodeUTF-8", "getMerchantListingsAllData",
                            ],
                            tableOptions:{
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "Required",
                                        "name": "cluster_asin",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "seller-sku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "asin1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-name",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-description",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "listing-id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "price",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "open-date",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product-id-type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-note",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item-condition",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "will-ship-internationally",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "expedited-shipping",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product-id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "pending-quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "fulfillment-channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Business Price",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price Type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Lower Bound 1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price 1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Lower Bound 2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price 2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Lower Bound 3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price 3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Lower Bound 4",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price 4",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Lower Bound 5",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity Price 5",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "optional-payment-type-exclusion",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "scheduled-delivery-sku-set",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "merchant-shipping-group",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "standard-price-point",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ProductTaxCode",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "status",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "minimum-seller-allowed-price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "maximum-seller-allowed-price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Price Type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Lower Bound 1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Price 1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Lower Bound 2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Price 2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Lower Bound 3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive Price 3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Sourcing Type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "string_field_44",
                                        "type": "STRING"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['cluster_asin'],
                                },
                            }
                        }
                    },
                    fileName: "GetMerchantListingsAllData.json",
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
    const docs = await FirestoreManager.getDocs("M_Request", [["tag", "==", data.tag]]);
    if (docs.length) {
        docRef = docs[0].ref;
    }
    await docRef.set(data);
}

// transaction
// https://stackoverflow.com/questions/57653308/firestore-transaction-update-multiple-collections-in-a-single-transaction