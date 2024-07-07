import root from '../../../root.js';

export async function create(request) {
    const clientId = _.get(request, ["account", "ads_token", "client_id"]);
    const clientSecret = _.get(request, ["account", "ads_token", "client_secret"]);
    const refreshToken = _.get(request, ["account", "ads_token", "refresh_token"]);
    const profileId = _.get(request, ["account", "ads_token", "profileId"]);

    const accessTokenFromRefreshToken = _.get(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const accesToken = await accessTokenFromRefreshToken(clientId, clientSecret, refreshToken);

    // 日付情報を付与
    //const body = request.body;
    //body.startDate = request.requestDate.start;
    //body.endDate = request.requestDate.end;

    const response = await fetch(`https://advertising-api${request.urlSuffix}.amazon.com/reporting/reports`, {
      method: "post",
      headers: {
        "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
        Authorization: "Bearer " + accesToken,
        "Amazon-Advertising-API-ClientId": clientId,
        "Amazon-Advertising-API-Scope": profileId,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };