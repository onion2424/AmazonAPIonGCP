import {clientID, clientSecret, profileID, refreshToken} from '../../../../../AmazonApiServiceKey/adsAPItoken.js';

export async function create(accesToken, date) {
    const response = await fetch("https://advertising-api-fe.amazon.com/reporting/reports", {
      method: "post",
      headers: {
        "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
        Authorization: "Bearer " + accesToken,
        "Amazon-Advertising-API-ClientId": clientID,
        "Amazon-Advertising-API-Scope": profileID,
      },
      body: JSON.stringify({
        "name":"",
        "startDate":date,
        "endDate":date,
        "configuration":{
            "adProduct":"SPONSORED_BRANDS",
            "groupBy":["campaign"],
            "columns":[
              "date", "campaignId", "addToCart", "addToCartClicks", "brandedSearches", 
              "brandedSearchesClicks", "campaignBudgetAmount", "campaignBudgetCurrencyCode", "campaignBudgetType", "campaignName",
              "campaignStatus", "clicks", "cost", "costType", "detailPageViews", 
              "detailPageViewsClicks","impressions","newToBrandDetailPageViews", "newToBrandDetailPageViewsClicks", "newToBrandPurchases", 
              "newToBrandPurchasesClicks", "newToBrandSales", "newToBrandSalesClicks", "newToBrandUnitsSold", "newToBrandUnitsSoldClicks",
              "purchases", "purchasesClicks", "purchasesPromoted", "sales", "salesClicks", 
              "salesPromoted", "topOfSearchImpressionShare", "unitsSold", "unitsSoldClicks", "video5SecondViews", 
              "videoCompleteViews", "videoFirstQuartileViews", "videoMidpointViews", "videoThirdQuartileViews", "videoUnmutes", 
              "viewableImpressions"
            ],
            "reportTypeId":"sbCampaigns",
            "timeUnit":"DAILY",
            "format":"GZIP_JSON"
        }
      }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };