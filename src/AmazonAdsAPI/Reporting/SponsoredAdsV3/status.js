import root from '../../../root.js';
import { _ , utils } from '../../../Common/systemCommon.js';

export async function status(request) {
  const clientId = _.get(request, ["account", "ads_token", "client_id"]);
  const clientSecret = _.get(request, ["account", "ads_token", "client_secret"]);
  const refreshToken = _.get(request, ["account", "ads_token", "refresh_token"]);
  const profileId = _.get(request, ["account", "ads_token", "profileId"]);

  const accessTokenFromRefreshToken = _.get(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"]);
  const accesToken = await accessTokenFromRefreshToken(clientId, clientSecret, refreshToken);
  
  const response = await fetch(`https://advertising-api${request.urlSuffix}.amazon.com/reporting/reports/${request.reportId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
        Authorization: "Bearer " + accesToken,
        "Amazon-Advertising-API-ClientId": clientId,
        "Amazon-Advertising-API-Scope": profileId,
      },
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };