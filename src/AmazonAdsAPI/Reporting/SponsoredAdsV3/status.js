import root from '../../../root.js';
import { _, utils, dayjs, amazonCommon } from '../../../Common/common.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import M_TokenManager, { M_Token } from '../../../FireStoreAPI/Collection/M_Token/manager.js';
import authManager from "../../Auth/AccessTokenFromRefreshToken/manager.js";
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * 
 * @param {D_ReportRequest} drequest 
 * @param {M_Request} mrequest 
 * @returns 
 */
export async function status(drequest, mrequest) {
  const accountDoc = await collectionManager.get(drequest.accountRef);
  /**
   * @type {M_Account}
   */
  const account = accountDoc.data();
  const clientId = account.token.ads_token.client_id;
  const profileId = account.profileId;

  const authRes = await authManager.get(accountDoc);
  if (authRes.ok != "ok") {
    return authRes;
  }
  const accesToken = authRes.token;

  const urlSuffix = amazonCommon.getURLEndPoint("ADS", account.marketplaceIds[0]);

  const response = await fetch(`https://advertising-api${urlSuffix}.amazon.com/reporting/reports/${drequest.reportInfo.reportId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/vnd.createasyncreportrequest.v3+json",
      Authorization: "Bearer " + accesToken.token,
      "Amazon-Advertising-API-ClientId": clientId,
      "Amazon-Advertising-API-Scope": profileId,
    },
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
      if (data.status == "FAILED") {
        error.handle = "FireStoreAPI/Collection/M_Error/Handle/cancel";
        error.tag = "CANCEL";
        return { ok: "error", error: error };
      }
      else if (data.status == "PENDING" || data.status == "PROCESSING") {
        reportInfo.continue = reportInfo.continue + 1;
        return { ok: "ok", reportInfo: reportInfo, next: false };
      }
      else if (data.status == "COMPLETED") {
        reportInfo.url = data.url;
        reportInfo.created = Timestamp.fromDate(dayjs(data.createdAt).toDate());
        reportInfo.continue = 0;
        reportInfo.expiration = Timestamp.fromDate(dayjs(data.urlExpiresAt).add(-5, "minute").toDate());
        return { ok: "ok", reportInfo: reportInfo, next: true };
      }
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