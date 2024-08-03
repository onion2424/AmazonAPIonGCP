import root from '../../../root.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import iconv from 'iconv-lite';
import { _, dayjs, gcpCommon, utils, amazonCommon } from "../../../Common/common.js";
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';
import * as path from "path";

// CommonJs
const { encodeStream } = iconv;
const { decodeStream } = iconv;

/**
 * 
 * @param {D_ReportRequest} drequest 
 * @param {M_Request} mrequest
 * @returns 
 */
export async function download(drequest, mrequest) {
  const accountDoc = await collectionManager.get(drequest.accountRef);
  /**
   * @type {M_Account}
   */
  const account = accountDoc.data();

  const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);

  if(dayjs(drequest.reportInfo.expiration.toDate()) < dayjs()){
      // エラー
      const error = M_ErrorManager.create();
      error.handle = "FireStoreAPI/Collection/M_Error/Handle/createStatus";
      error.tag = "URL期限切れ";
      return { ok: "error", error: error };
  }

  const response = await fetch(`${drequest.reportInfo.url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/gzip",
    },
  })
    .catch((e) => {
      L_ErrorManager.onRequestError(e, drequest); // ログの処理。
      return false;
    });

  // 成功
  if (response && "status" in response) {
    if (response.ok) {
      //let readable = Readable.fromWeb(res.body);
      const extension = path.extname(detail.settings.save.fileName);
      let destFileName = utils.combine(gcpCommon.AMAZON_REPORT, dayjs(drequest.requestInfo.date.start).format('YYYY-MM-DD'), account.tag, "temp", detail.settings.save.fileName.replace(extension, "") + "_" + dayjs(drequest.reportInfo.created.toDate()).format("YYYYMMDDHHmmss") + extension);

      const uploaded = await storageManager.streamFileUpload(destFileName, Readable.fromWeb(response.body), []);
      if (uploaded) {
        const reportInfo = structuredClone(drequest.reportInfo);
        reportInfo.filepath = destFileName;
        return { ok: "ok", reportInfo: reportInfo, next: true };
      }
    }
    // 失敗
    else {
      const data = await response.json();
      const status = mrequest.statuses.find(s => s.status == drequest.status);
      const error = M_ErrorManager.create(status.path, response.status, JSON.stringify(data));
      error.tag = `ステータス=${response.status}`;
      return { ok: "ng", error: error,  token: accesTokenDoc  };
    }
  }
  // エラー
  const error = M_ErrorManager.create();
  error.tag = "不明なエラー";
  return { ok: "error", error: error };
  /*
    .then(async (res) => {
    let readable = Readable.fromWeb(res.body);
    let destFileName = utils.combine(gcpCommon.AMAZON_SP_API_REPORT, account.tag, detail.fileName);
    let streams =
      [
        readable,
        decodeStream('Shift_JIS'),
        encodeStream('utf-8')
      ];
    await storageManager.streamFileUpload(destFileName, streams);
  })
    .catch((err) => false);
  return response;
  */
};