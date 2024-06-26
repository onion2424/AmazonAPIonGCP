import {clientID, clientSecret, refreshToken} from '../../../../AmazonApiServiceKey/spAPItoken.js';

export async function status(accesToken, reportId) {
    const response = await fetch(`https://sellingpartnerapi-fe.amazon.com/reports/2021-06-30/reports/${reportId}`, {
      method: "get",
      headers: {
        "x-amz-access-token": accesToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };