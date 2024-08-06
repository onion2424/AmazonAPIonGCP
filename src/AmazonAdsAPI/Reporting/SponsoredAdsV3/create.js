import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import { amazonCommon } from '../../../Common/common.js';
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import authManager from "../../Auth/AccessTokenFromRefreshToken/manager.js";
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';

import root from '../../../root.js';

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
  const clientId = account.token.ads_token.client_id;
  const profileId = account.profileId;

  const accesTokenDoc = await authManager.get(account);
  const accesToken = accesTokenDoc.data();

  // 日付情報を付与
  const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);
  const body = detail.body;
  body.startDate = drequest.requestInfo.date.start;
  body.endDate = drequest.requestInfo.date.end;
  const urlSuffix = amazonCommon.getURLEndPoint("ADS", account.marketplaceIds[0]);
  const response = await fetch(`https://advertising-api${urlSuffix}.amazon.com/reporting/reports`, {
    method: "post",
    headers: {
      "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
      Authorization: "Bearer " + accesToken.token,
      "Amazon-Advertising-API-ClientId": clientId,
      "Amazon-Advertising-API-Scope": profileId,
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
      return { ok: "ng", error: error};
    }
  }

  // エラー
  const error = M_ErrorManager.create();
  error.tag = "不明なエラー";
  return { ok: "error", error: error };
};