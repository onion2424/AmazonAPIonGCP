import {clientID, clientSecret, profileID, refreshToken} from '../../../AmazonApiServiceKey/adsAPItoken.js';

export async function accessTokenFromRefreshToken() {
    const response = await fetch("https://api.amazon.co.jp/auth/o2/token", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientID,
        client_secret: clientSecret,
      }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };