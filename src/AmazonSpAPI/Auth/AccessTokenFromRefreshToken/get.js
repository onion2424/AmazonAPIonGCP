//import {clientID, clientSecret, refreshToken} from '../../../AmazonApiServiceKey/spAPItoken.js';

export async function get(clientId, clientSecret, refreshToken) {
    const response = await fetch("https://api.amazon.co.jp/auth/o2/token", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })
      .then((res) => res.json())
      .catch((err) => false);
    return response;
  };