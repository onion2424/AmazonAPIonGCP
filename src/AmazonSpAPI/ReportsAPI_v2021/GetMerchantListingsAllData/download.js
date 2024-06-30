import {clientID, clientSecret, refreshToken, name} from '../../../../AmazonApiServiceKey/spAPItoken.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import iconv from 'iconv-lite';
import parser from "stream-json";

// CommonJs
const { encodeStream } = iconv;
const { decodeStream } = iconv;

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
            let destFileName = path + name + "/GetMerchantListingsAllData.csv"
            let streams = 
            [
              readable,
              decodeStream('Shift_JIS'),
              encodeStream( 'utf-8' )
            ];
            await storageManager.streamFileUpload(destFileName, streams);
        })
      .catch((err) => false);
    return response;
  };