import root from '../../../root.js';
import { _ , utils } from '../../../Common/systemCommon.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import iconv from 'iconv-lite';

// CommonJs
const { encodeStream } = iconv;
const { decodeStream } = iconv;

export async function download(request) {
    const response = await fetch(`${request.url}`, {
      method: "get",
      headers: {
        "Content-Type": "application/gzip",
      },
    })
      .then(async (res) => 
        {
            let readable = Readable.fromWeb(res.body);
            let destFileName = utils.combine(googleCloudStorageAPIConst.AMAZON_ADS_API, request.account.name, "/GetFbaMyiAllInventoryData.csv")
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