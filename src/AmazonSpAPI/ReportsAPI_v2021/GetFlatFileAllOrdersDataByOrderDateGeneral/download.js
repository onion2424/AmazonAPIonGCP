import {clientID, clientSecret, refreshToken, name} from '../../../../AmazonApiServiceKey/spAPItoken.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import { streamFileUpload } from '../../../GoogleCloudAPI/streamFileUpload.js';
import iconv from 'iconv-lite';

// CommonJs
const { encodeStream } = iconv;
const { decodeStream } = iconv;

export async function download(url, path) {
    const response = await fetch(`${url}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => 
        {
            let readable = Readable.fromWeb(res.body);
            let destFileName = path + name + "/GetFlatFileOrdersDataByOrderDateGeneral.csv"
            let streams = 
            [
              readable,
              decodeStream('Shift_JIS'),
              encodeStream( 'utf-8' )
            ];
            await streamFileUpload(destFileName, streams);
        })
      .catch((err) => false);
    return response;
  };