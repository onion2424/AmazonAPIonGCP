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
            "adProduct":"SPONSORED_PRODUCTS",
            "groupBy":["advertiser"],
            "columns":[
              "date", "adGroupId","campaignId", "advertisedAsin", "impressions", 
              "clicks", "cost", "spend", "advertisedSku", "purchases1d", 
              "purchases7d", "purchases14d", "purchases30d", "purchasesSameSku1d", "purchasesSameSku7d", 
              "purchasesSameSku14d", "purchasesSameSku30d", "unitsSoldClicks1d", "unitsSoldClicks7d", "unitsSoldClicks14d", 
              "unitsSoldClicks30d", "sales1d", "sales14d", "sales30d", "attributedSalesSameSku1d", 
              "attributedSalesSameSku7d", "attributedSalesSameSku14d", "attributedSalesSameSku30d", "unitsSoldSameSku1d", "unitsSoldSameSku7d", 
              "unitsSoldSameSku14d", "unitsSoldSameSku30d",
            ],
            "reportTypeId":"spAdvertisedProduct",
            "timeUnit":"DAILY",
            "format":"GZIP_JSON"
        }
      }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };