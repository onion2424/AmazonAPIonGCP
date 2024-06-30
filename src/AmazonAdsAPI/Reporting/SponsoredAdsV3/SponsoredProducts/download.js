import {clientID, clientSecret, profileID, refreshToken, name} from '../../../../../AmazonApiServiceKey/adsAPItoken.js';
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import storageManager from "../../../../GoogleCloudStorageAPI/manager.js"
import parser from "stream-json";
import streamArray from "stream-json/streamers/StreamArray.js"

export async function download(url, path)
{
    const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "gzip",
        },
      })
        .then(async (res) =>{
            let readable = Readable.fromWeb(res.body);
            let destFileName = path + name + "/SponsoredProducts.json"
            let streams = 
            [
              readable,
              createGunzip(),
              parser(),
              new streamArray(),
              // ({value}) => {
              //   return JSON.stringify({profileId: profileID, ...value}) + '\n'
              // },
              ({value}) => {
                return JSON.stringify(value) + '\n'
              },
            ];
            await storageManager.streamFileUpload(destFileName, streams);
        })
        .catch((err) => false);
      return response;
}