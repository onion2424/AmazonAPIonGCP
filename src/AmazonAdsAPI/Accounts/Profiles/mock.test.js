import { test, skip, mock } from "node:test";
import assert from "node:assert";
import accountsManager from "./manager.js"
import accessTokenManager from "../../Auth/AccessTokenFromRefreshToken/manager.js"


// Auth
test("Auth test", async (t) => {
  // mock
  let ctx = mock.method(global, "fetch", (url, payload) => {
    return new Promise((resolve) => resolve({
      // mockしたいのはこの部分
      json: () => new Promise((r) => r({
        method: payload.method,
        headers: payload.headers,
        body: payload.body,
      })),
    }));
  });

  console.log(fetch);

  // requestの形式のみ確認
  let actual = { method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: '{"grant_type":"refresh_token","refresh_token":"refresh_token","client_id":"client_id","client_secret":"client_secret"}' };
  let test = await accessTokenManager.get("client_id", "client_secret", "refresh_token");  
  assert.strictEqual(JSON.stringify(test), JSON.stringify(actual));

  //ctx.mock.resetCalls();
  //ctx.mock.restore();
}, "");

test("mock test", async (t) => {
  // mock.fnはモック関数を作成するためのもので、mockするわけではない - メソッドのmockのみネイティブサポート(すべてrootで管理するので問題ない)
  // https://nodejs.org/api/test.html
  let ctx = mock.method(accessTokenManager, "get", (client_id, client_secret, refresh_token) => {
    return new Promise((resolve) => resolve({

      acccess_token: "test_access_token",
      refresh_token: "test_refresh_token",
      expires_in: "3600",
    }));
  });
  const actual = { acccess_token: 'test_access_token', refresh_token: 'test_refresh_token', expires_in: '3600' };
  const test = await accessTokenManager.get("client_id", "client_secret", "refresh_token");
  assert.strictEqual(JSON.stringify(test), JSON.stringify(actual));
  ctx.mock.resetCalls();
  ctx.mock.restore();
}, "");

test("payload test", async (t) => {
  // mock
  let ctx = mock.method(global, "fetch", (url, payload) => {
    return new Promise((resolve) => resolve({
      // mockしたいのはこの部分
      json: () => new Promise((r) => r({
        method: payload.method,
        headers: payload.headers,
        body: payload.body,
      })),
    }));
  });
  const actual = {"method":"get","headers":{"Content-Type":"application/json","Authorization":"Bearer refresh_token","Amazon-Advertising-API-ClientId":"client_id"}};
  const test = await accountsManager.get("client_id", "refresh_token");
  assert.strictEqual(JSON.stringify(test), JSON.stringify(actual));
  ctx.mock.resetCalls();
  ctx.mock.restore();
}, "");

// 連結テストで使うmockのテスト
test("unauthorized mock test", async (t) => {
  // mock
  let ctx = mock.method(global, "fetch", (url, payload) => {
    return new Promise((resolve) => resolve({
      // mockしたいのはこの部分
      json: () => new Promise((r) => r({"code":"UNAUTHORIZED","details":"HTTP 401 Unauthorized","requestId":"6X34NA9HWDBWFP3FPY24"})),
    }));
  });
  const actual = {"code":"UNAUTHORIZED","details":"HTTP 401 Unauthorized","requestId":"6X34NA9HWDBWFP3FPY24"};
  const test = await accountsManager.get("client_id", "refresh_token");
  assert.strictEqual(JSON.stringify(test), JSON.stringify(actual));
  ctx.mock.resetCalls();
  ctx.mock.restore();
}, "");
