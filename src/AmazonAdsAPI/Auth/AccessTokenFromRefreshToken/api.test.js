import { test, skip, mock, assert } from "../../../Common/testCommon.js";
import accessTokenManager from "./manager.js"

const prefix = "Auth/AccessTokenFromRefreshToken ";

// Auth
test(prefix + "Auth test", {only: false}, async (t) => {
    // mock
    // let ctx = mock.method(global, "fetch", (url, payload) => {
    //   return new Promise((resolve) => resolve({
    //     // mockしたいのはこの部分
    //     json: () => new Promise((r) => r({
    //       method: payload.method,
    //       headers: payload.headers,
    //       body: payload.body,
    //     })),
    //   }));
    // });
  
    // requestの形式のみ確認
    let actual = { method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: '{"grant_type":"refresh_token","refresh_token":"refresh_token","client_id":"client_id","client_secret":"client_secret"}' };
    let test = await accessTokenManager.get("client_id", "client_secret", "refresh_token");  
    assert.strictEqual(JSON.stringify(test), JSON.stringify(actual));
  
    ctx.mock.resetCalls();
    ctx.mock.restore();
  }, "");