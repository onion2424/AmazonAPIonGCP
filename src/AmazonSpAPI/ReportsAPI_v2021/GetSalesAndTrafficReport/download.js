import {clientID, clientSecret, refreshToken, name} from '../../../../AmazonApiServiceKey/spAPItoken.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import parser from "stream-json";

export async function download(url, path) {
    const response = await fetch(`${url}`, {
      method: "get",
      headers: {
        "Content-Type": "application/gzip",
      },
    })
    .then(async (res) => 
      {
          let readable = Readable.fromWeb(res.body);
          let destFileName = path + name + "/GetSalesAndTrafficReport.json"
          let streams = 
          [
            readable,
            createGunzip(),
          ];
          await storageManager.streamFileUpload(destFileName, streams);
      })
    .catch((err) => false);
    return response;
  };