import root from '../../../root.js';
import { _ , utils } from '../../../Common/common.js';
import {clientID, clientSecret, refreshToken} from '../../../../AmazonApiServiceKey/spAPItoken.js';

export async function create(request) {
  const clientId = _.get(request, ["account", "sp_token", "client_id"]);
  const clientSecret = _.get(request, ["account", "sp_token", "client_secret"]);
  const refreshToken = _.get(request, ["account", "sp_token", "refresh_token"]);
  const profileId = _.get(request, ["account", "sp_token", "profileId"]);

  const accessTokenFromRefreshToken = _.get(root, ["AmazonSpAPI", "Auth", "AccessTokenFromRefreshToken"]);
  const accesToken = await accessTokenFromRefreshToken(clientId, clientSecret, refreshToken);  
  
  const response = await fetch(`https://sellingpartnerapi${request.urlSuffix}.amazon.com/reports/2021-06-30/reports`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-amz-access-token": accesToken,
      },
      body: JSON.stringify(request.body),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };