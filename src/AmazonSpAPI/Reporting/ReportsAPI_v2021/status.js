import root from '../../../root.js';
import { _, dayjs, utils, amazonCommon } from '../../../Common/common.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import authManager from "../../Auth/AccessTokenFromRefreshToken/manager.js"
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';
import { Timestamp, Transaction } from "firebase-admin/firestore";

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

  const accesTokenDoc = await authManager.get(account);
  const accesToken = accesTokenDoc.data();

  const urlSuffix = amazonCommon.getURLEndPoint("SP", account.marketplaceIds[0]);

  const response = await fetch(`https://sellingpartnerapi${urlSuffix}.amazon.com/reports/2021-06-30/reports/${drequest.reportInfo.reportId}`, {
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

      if (data.processingStatus == "CANCELED") {
        // 作成できないので終了させる
        const error = M_ErrorManager.create();
        error.handle = "FireStoreAPI/Collection/M_Error/Handle/cancel";
        error.tag = "CANCELED";
        return { ok: "error", error: error };
      }
      else if (data.processingStatus == "FATAL") {
        // パスさせる
        const error = M_ErrorManager.create();
        error.handle = "FireStoreAPI/Collection/M_Error/Handle/createStatus";
        error.tag = "FATAL";
        return { ok: "error", error: error };
      }
      else if (data.processingStatus == "IN_PROGRESS" || data.processingStatus == "IN_QUEUE") {
        reportInfo.continue = reportInfo.continue + 1;
        return { ok: "ok", reportInfo: reportInfo, next: false };
      }
      else if (data.processingStatus == "DONE") {
        reportInfo.created = Timestamp.fromDate(dayjs(data.createdTime.slice(0, -6)).toDate());
        reportInfo.documentId = data.reportDocumentId;
        reportInfo.continue = 0;
        return { ok: "ok", reportInfo: reportInfo, next: true };
      }
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