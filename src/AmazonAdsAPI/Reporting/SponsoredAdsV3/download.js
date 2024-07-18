import root from "../../../root.js"
import { _, utils } from "../../../Common/systemCommon.js";
import googleCloudStorageAPIConst from "../../../GoogleCloudStorageAPI/const.js";
import { createGunzip } from 'zlib';
import { Readable } from 'node:stream';
import parser from "stream-json";
import streamArray from "stream-json/streamers/StreamArray.js"

export async function download(request)
{
    const response = await fetch(request.url, {
        method: "get",
        headers: {
          "Content-Type": "gzip",
        },
      })
        .then(async (res) =>{
            let readable = Readable.fromWeb(res.body);
            let destFileName = utils.combine("AmazonAdsAPI", request.account.name ,"SponsoredProducts.json")
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
            const streamFileUpload = _.get(root, ["GoogleCloudStorageAPI", "streamFileUpload"]);
            await streamFileUpload(destFileName, streams);
            // request更新
        })
        .catch((err) => false);
      return response;
}