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
            "reportType": "GET_SALES_AND_TRAFFIC_REPORT",
            "dataStartTime": dataStartTime,
            "dataEndTime": dataEndTime,
            "marketplaceIds": [
               "A1VC38T7YXB528"
             ],
            "reportOptions":{"dateGranularity":"DAY", "asinGranularity":"CHILD"}
        }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };