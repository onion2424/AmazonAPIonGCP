import {clientID, clientSecret, profileID, refreshToken} from '../../../../../AmazonApiServiceKey/adsAPItoken.js';

export async function status(accesToken, reportId) {
    const response = await fetch("https://advertising-api-fe.amazon.com/reporting/reports/" + reportId, {
      method: "get",
      headers: {
        "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
        Authorization: "Bearer " + accesToken,
        "Amazon-Advertising-API-ClientId": clientID,
        "Amazon-Advertising-API-Scope": profileID,
      },
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };