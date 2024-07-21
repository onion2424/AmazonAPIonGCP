import root from '../../../root.js';
import { _, utils, amazonCommon, dayjs } from '../../../Common/common.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
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
export async function get(drequest, mrequest) {
  const accountDoc = await collectionManager.get(drequest.accountRef);
  /**
   * @type {M_Account}
   */
  const account = accountDoc.data();
  const accesToken = await authManager.get(account);
  const urlSuffix = amazonCommon.getURLEndPoint("SP", account.token.sp_token.marketplaceIds[0]);

  const response = await fetch(`https://sellingpartnerapi${urlSuffix}.amazon.com/reports/2021-06-30/documents/${drequest.reportInfo.documentId}`, {
    method: "get",
    headers: {
      "x-amz-access-token": accesToken.token,
      "Content-Type": "application/json",
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
      reportInfo.url = data.url;
      reportInfo.expiration = Timestamp.fromDate(dayjs().add(3, 'minute').toDate());
      reportInfo.continue = 0;
      return { ok: "ok", reportInfo: reportInfo };
    }
    // 失敗
    else {
      const data = await response.json();
      const status = mrequest.statuses.find(s => s.status == drequest.status);
      const error = M_ErrorManager.create(status.path, response.status, JSON.stringify(data));
      return { ok: "ng", error: error };
    }
  }
  // エラー
  const error = M_ErrorManager.create();
  error.tag = "不明なエラー";
  return { ok: "error", error: error };
};