import root from "../../../root.js"
import { _, dayjs, gcpCommon, utils, amazonCommon } from "../../../Common/common.js";
import { createGunzip } from 'zlib';
import { Readable, Transform } from 'node:stream';
import parser from "stream-json";
import streamArray from "stream-json/streamers/StreamArray.js"
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import L_ErrorManager from '../../../FireStoreAPI/Collection/L_Error/manager.js';
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';

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

  if (dayjs(drequest.reportInfo.expiration.toDate()) < dayjs()) {
    // エラー
    const error = M_ErrorManager.create();
    error.handle = "FireStoreAPI/Collection/M_Error/Handle/createStatus";
    error.tag = "URL期限切れ";
    return { ok: "error", error: error };
  }

  const response = await fetch(drequest.reportInfo.url, {
    method: "get",
    headers: {
      "Content-Type": "gzip",
    },
  })
    .catch((e) => {
      L_ErrorManager.onRequestError(e, drequest); // ログの処理。
      return false;
    });
  // 成功
  if (response && "status" in response) {
    if (response.ok) {
      // gz形式で保存
      const fileName = detail.settings.save.fileName.replace(".json", ".json");
      let destFileName = utils.combine(gcpCommon.AMAZON_ADS_API_REPORT, dayjs(drequest.requestInfo.date.start).format('YYYY-MM-DD'), account.tag, "temp", fileName);

      //エラーハンドリングできない?
      // const noop = new Transform({objectMode: true, transform: function(chunk, encoding, callback)
      //   {
      //     const error = new Error("noop");
      //     callback(error, JSON.stringify(chunk) + '\n');
      //   }});
      //   noop.on("error", (e) => {
      //     console.log(e);
      //     return true;
      //   })
      const uploaded = await storageManager.streamFileUpload(destFileName, Readable.fromWeb(response.body), []);
      // ステータス更新
      const reportInfo = structuredClone(drequest.reportInfo);
      if (uploaded) {
        reportInfo.filepath = destFileName;
        reportInfo.continue = 0;
        return { ok: "ok", reportInfo: reportInfo, next: true };
      }
      // ここに来た場合はエラーで返す
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

  // gz形式で保存
  const fileName = detail.fileName.replace(".json", ".gz");
  let destFileName = utils.combine(dayjs(drequest.requestInfo.date.start).format('YYYY-MM-DD'), gcpCommon.AMAZON_SP_API_REPORT, account.tag, detail.fileName);
  //let readable = Readable.fromWeb(res.body);
  // let streams =
  //   [
  //     readable,
  //     createGunzip(),
  //     parser(),
  //     new streamArray(),
  //     // ({value}) => {
  //     //   return JSON.stringify({profileId: profileID, ...value}) + '\n'
  //     // },
  //     ({ value }) => {
  //       return JSON.stringify(value) + '\n'
  //     },
  //   ];
  let streams = [res.body];
  await storageManager.streamFileUpload(destFileName, streams);
}