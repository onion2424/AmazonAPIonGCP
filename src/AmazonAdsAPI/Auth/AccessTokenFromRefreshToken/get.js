//import {clientID, clientSecret, profileID, refreshToken} from '../../../AmazonApiServiceKey/adsAPItoken.js';
import { _ } from "../../../Common/common.js";
import M_ErrorManager, { M_Error } from "../../../FireStoreAPI/Collection/M_Error/manager.js";
import L_ErrorManager, { L_Error } from "../../../FireStoreAPI/Collection/L_Error/manager.js";

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
    .catch((e) => {
      L_ErrorManager.onRequestError(e, null); // ログの処理。
      return false;
    });

  // 成功
  if (response && "status" in response) {
    if (response.ok) {
      const token = await response.json()
      return { ok:"ok", token: token };
    }
    // 失敗
    else
    {
      const message = await response.text();
      return { ok: "invalid" };
    }
  }


  // エラー
  const error = M_ErrorManager.create();
  error.tag = "不明なエラー";
  return { ok: "error", error: error };
};