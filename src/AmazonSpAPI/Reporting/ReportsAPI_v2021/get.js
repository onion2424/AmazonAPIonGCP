import root from '../../../root.js';
import { _ , utils } from '../../../Common/common.js';

export async function get(request) {
    const clientId = _.get(request, ["account", "sp_token", "client_id"]);
    const clientSecret = _.get(request, ["account", "sp_token", "client_secret"]);
    const refreshToken = _.get(request, ["account", "sp_token", "refresh_token"]);
    const profileId = _.get(request, ["account", "sp_token", "profileId"]);

    const accessTokenFromRefreshToken = _.get(root, ["AmazonSpAPI", "Auth", "AccessTokenFromRefreshToken"]);
    const accesToken = await accessTokenFromRefreshToken(clientId, clientSecret, refreshToken);    


    const response = await fetch(`https://sellingpartnerapi${request.urlSuffix}.amazon.com/reports/2021-06-30/documents/${reportDocumentId}`, {
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