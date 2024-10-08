import root from '../../../root.js';
import { _, utils, amazonCommon, dayjs } from '../../../Common/common.js';
import { clientID, clientSecret, refreshToken } from '../../../../AmazonApiServiceKey/spAPItoken.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import authManager from "../../Auth/AccessTokenFromRefreshToken/manager.js"
import collectionManager from "../../../FireStoreAPI/Collection/manager.js"
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';

/**
 * 
 * @param {D_ReportRequest} drequest 
 * @param {M_Request} mrequest 
 * @returns 
 */
export async function create(drequest, mrequest) {
  const accountDoc = await collectionManager.get(drequest.accountRef);
  /**
   * @type {M_Account}
   */
  const account = accountDoc.data();

  const authRes = await authManager.get(accountDoc);
  if (authRes.ok != "ok") {
    return authRes;
  }
  const accesToken = authRes.token;

  // 日付情報を付与
  const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);
  const body = detail.body;
  body.dataStartTime = drequest.requestInfo.date.start;
  body.dataEndTime = drequest.requestInfo.date.end;
  body.marketplaceIds = account.marketplaceIds;
  const urlSuffix = amazonCommon.getURLEndPoint("SP", account.marketplaceIds[0]);

  const response = await fetch(`https://sellingpartnerapi${urlSuffix}.amazon.com/reports/2021-06-30/reports`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-amz-access-token": accesToken.token,
    },
    body: JSON.stringify(body),
  })
    .catch((e) => {
      L_ErrorManager.onRequestError(e, drequest); // ログの処理。
      return false;
    });

  // 成功
  if (response && "status" in response) {
    if (response.ok) {
      const data = await response.json();
      const reportInfo = structuredClone(drequest.reportInfo);
      reportInfo.reportId = data.reportId;
      reportInfo.continue = 0;
      return { ok: "ok", reportInfo: reportInfo, next: true };
    }
    // 失敗
    else {
      const message = await response.text();
      const status = mrequest.statuses.find(s => s.status == drequest.status);
      const error = M_ErrorManager.create(status.path, response.status, message);
      error.tag = `ステータス=${response.status}`;
      return { ok: "ng", error: error };
    }
  }
  // エラー
  const error = M_ErrorManager.create();
  error.tag = "不明なエラー";
  return { ok: "error", error: error };
};