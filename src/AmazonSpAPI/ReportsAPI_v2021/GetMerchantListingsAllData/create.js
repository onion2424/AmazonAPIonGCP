import {clientID, clientSecret, refreshToken} from '../../../../AmazonApiServiceKey/spAPItoken.js';

export async function create(accesToken, dataStartTime, dataEndTime) {
    const response = await fetch("https://sellingpartnerapi-fe.amazon.com/reports/2021-06-30/reports", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-amz-access-token": accesToken,
      },
      body: JSON.stringify(
        {
            "reportType": "GET_MERCHANT_LISTINGS_ALL_DATA",
            "dataStartTime": dataStartTime,
            "dataEndTime": dataEndTime,
            "marketplaceIds": [
               "A1VC38T7YXB528"
            ],
            "reportOptions":{"dateGranularity":"DAY"}
        }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };