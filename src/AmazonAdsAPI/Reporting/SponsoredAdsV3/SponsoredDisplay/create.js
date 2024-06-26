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
            "adProduct":"SPONSORED_DISPLAY",
            "groupBy":["advertiser"],
            "columns":[
              "date", "adGroupId","campaignId", "addToCart", "addToCartClicks", 
              "brandedSearches", "brandedSearchesClicks", "clicks", "cost", "detailPageViews", 
              "detailPageViewsClicks", "impressions", "impressionsFrequencyAverage",
              "impressionsViews", "newToBrandDetailPageViewClicks", "newToBrandDetailPageViews", "newToBrandDetailPageViewViews", "newToBrandPurchases", 
              "newToBrandPurchasesClicks","newToBrandSales","newToBrandSalesClicks",
              "newToBrandUnitsSold", "newToBrandUnitsSoldClicks", "promotedAsin", "purchases", "purchasesClicks",
              "purchasesPromotedClicks", "sales", "salesClicks", "salesPromotedClicks", "unitsSold",
              "unitsSoldClicks", "videoCompleteViews", "videoFirstQuartileViews", "videoMidpointViews", "videoThirdQuartileViews", 
              "videoUnmutes"
            ],
            "reportTypeId":"sdAdvertisedProduct",
            "timeUnit":"DAILY",
            "format":"GZIP_JSON"
        }
      }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };