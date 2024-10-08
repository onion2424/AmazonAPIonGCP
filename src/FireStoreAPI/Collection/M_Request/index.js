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
                                        "type": "STRING"
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
                                        "type": "STRING"
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
                                        "type": "STRING"
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
                                        "type": "STRING"
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
                                        "type": "STRING"
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
                        "reportOptions": {
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
                                        "name": "product_name",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "condition",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "your_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "mfn_listing_exists",
                                        "type": "BOOLEAN"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "mfn_fulfillable_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_listing_exists",
                                        "type": "BOOLEAN"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_warehouse_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_fulfillable_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_unsellable_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_reserved_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_total_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "per_unit_volume",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_inbound_working_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_inbound_shipped_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_inbound_receiving_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_researching_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_reserved_future_supply",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "afn_future_supply_buyable",
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
                        },
                        save:
                        {
                            fileName: "GetFlatFileAllOrdersDataByOrderDateGeneral.json",
                            tableName: "GetFlatFileAllOrdersDataByOrderDateGeneral",
                            translaters: [
                                "decodeSJIS", "encodeUTF-8", "GetFlatFileAllOrdersDataByOrderDateGeneral"
                            ],
                            tableOptions: {
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
                                        "name": "amazon_order_id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "merchant_order_id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "purchase_date",
                                        "type": "TIMESTAMP"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "last_updated_date",
                                        "type": "TIMESTAMP"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "order_status",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "fulfillment_channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "sales_channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "order_channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_service_level",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product_name",
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
                                        "name": "item_status",
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
                                        "name": "item_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_tax",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "shipping_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "shipping_tax",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "gift_wrap_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "gift_wrap_tax",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_promotion_discount",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_promotion_discount",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_city",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_state",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_postal_code",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "ship_country",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "promotion_ids",
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
                        "reportOptions": {
                            "asinGranularity": "CHILD",
                            "dateGranularity": "DAY",
                            "custom": "true",
                        }
                    },
                    refName: "mergedData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate2",
                        },
                        save:
                        {
                            fileName: "GetSalesAndTrafficReport.json",
                            tableName: "GetSalesAndTrafficReport",
                            translaters: [
                                "gunzip", "getSalesAndTrafficReport",
                            ],
                            tableOptions: {
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
                                                "name": "reportOptions",
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
                        },
                        save:
                        {
                            fileName: "GetMerchantListingsAllData.json",
                            tableName: "GetMerchantListingsAllData",
                            translaters: [
                                "decodeSJIS", "encodeUTF-8", "getMerchantListingsAllData",
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
                                        "name": "seller_sku",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "asin1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_name",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_description",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "listing_id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "open_date",
                                        "type": "TIMESTAMP"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product_id_type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_note",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "item_condition",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "will_ship_internationally",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "expedited_shipping",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "product_id",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "pending_quantity",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "fulfillment_channel",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Business_Price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_Type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Lower_Bound_1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Lower_Bound_2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Lower_Bound_3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Lower_Bound_4",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_4",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Lower_Bound_5",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Quantity_Price_5",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "optional_payment_type_exclusion",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "scheduled_delivery_sku_set",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "merchant_shipping_group",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "standard_price_point",
                                        "type": "BIGNUMERIC"
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
                                        "name": "minimum_seller_allowed_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "maximum_seller_allowed_price",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Price_Type",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Lower_Bound_1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Price_1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Lower_Bound_2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Price_2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Lower_Bound_3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Progressive_Price_3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "Sourcing_Type",
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

{
    let docRef = FirestoreManager.createRef("M_Request");

    let data = {
        details:
            [
                {
                    body:
                    {
                        "reportType": "GET_BRAND_ANALYTICS_SEARCH_TERMS_REPORT",
                        "dataStartTime": "",
                        "dataEndTime": "",
                        "marketplaceIds": [],
                        "reportOptions": {
                            "reportPeriod": "DAY",
                        }
                    },
                    refName: "dailyData",
                    settings: {
                        date:
                        {
                            path: "AmazonSpAPI/Reporting/ReportsAPI_v2021/Settings/Date/getDate3",
                        },
                        save:
                        {
                            fileName: "GetBrandAnalysticsSearchTermsReport.json",
                            tableName: "GetBrandAnalysticsSearchTermsReport",
                            translaters: [
                                "gunzip", "GetBrandAnalysticsSearchTermsReport",
                            ],
                            tableOptions: {
                                schema: [
                                    {
                                        "mode": "Required",
                                        "name": "partition_date",
                                        "type": "DATE"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "conversionShare3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShare3",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedItemName3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedAsin3",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "conversionShare2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShare2",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShareRank3",
                                        "type": "INTEGER"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedItemName2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "conversionShare1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShareRank1",
                                        "type": "INTEGER"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedAsin2",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedItemName1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickedAsin1",
                                        "type": "STRING"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShareRank2",
                                        "type": "INTEGER"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "searchFrequencyRank",
                                        "type": "INTEGER"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "clickShare1",
                                        "type": "BIGNUMERIC"
                                    },
                                    {
                                        "mode": "NULLABLE",
                                        "name": "searchTerm",
                                        "type": "STRING"
                                    }
                                ],
                                timePartitioning: {
                                    type: 'DAY',
                                    field: 'partition_date',
                                },
                                clustering: {
                                    fields: ['searchTerm'],
                                },
                            }
                        }
                    },
                    tag: "日別レポート"
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
        tag: "検索ランキングレポート",
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