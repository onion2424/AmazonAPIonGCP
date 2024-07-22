import { utils } from '../Common/common.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';
import { logger } from '../Common/common.js';
import { finished } from 'node:stream/promises';
import { createGunzip } from 'zlib';
import parser from "stream-json";
import streamArray from "stream-json/streamers/StreamArray.js"
import streamValue from "stream-json/streamers/StreamValues.js"
import streamObject from "stream-json/streamers/StreamObject.js"
import iconv from 'iconv-lite';
import * as csv from 'fast-csv'
// Get a reference to the bucket


// Create a pass through stream from a string
// const passthroughStream = new stream.PassThrough();
// passthroughStream.write(contents);
// passthroughStream.end();

/**
 * 
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} destFileName 
 * @param {ReadableStream} readable
 * @param {[string]} translaters 
 * @returns 
 */
export async function streamFileUpload(storage, bucketName, destFileName, readable, translaters) {
    logger.info(`[アップロード開始][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    let ret = true;

    const myBucket = storage.bucket(bucketName);

    //console.log(filepath);

    // Create a reference to a file object
    const file = myBucket.file(destFileName);
    const writable = file.createWriteStream();
    // const stream = new chain(
    //     [
    //         readable,
    //         ...streams,
    //         writable,
    //     ]);

    // https://stackoverflow.com/questions/69288587/javascript-nodejs-how-to-use-stream-promises-with-async-functions
    // const promise = new Promise((resolve, reject) => {
    //     stream.on('error', (e) => {
    //         ret = false;
    //         writable.end();
    //         logger.error('[GCPエラー][アップロード失敗][エラー内容表示]', e);
    //         stream.removeAllListeners("end");
    //     });
    //     stream.on('finish', () => {
    //         if (ret)
    //             resolve(true);
    //     });
    // });
    // await promise;
    // pipeをつなぐ
    //const end = new pipeline(readable, writable);

    // エラーハンドリング https://www.npmjs.com/package/stream-chain
    // stream.on('error', (e) => {
    //     ret = false;
    //     logger.error('[GCPエラー][アップロード失敗][エラー内容表示]', e);
    //     return ret;
    // });

    // https://tech-blog.lakeel.com/n/n62073e6f3101
    // https://stackoverflow.com/questions/72469767/nodejs-stream-pipeline-the-val-argument-must-be-an-instance-of-readable-ite
    // https://zenn.dev/dev_commune/articles/46d0abd2ab93c0
    await pipeline(readable, ...getTranslaters(translaters), writable)
        .catch((e) => {
            ret = false;
            writable.end();
            logger.error('[GCPエラー][アップロード失敗][エラー内容表示]', e);
        });

    /*
    [...streams, writable].forEach((item) => {
        if ('on' in item) {
            item.on('error', (e) => {
                ret = false;
                logger.error('[GCPエラー][アップロード失敗][エラー内容表示]', e);
            })
        }
    })
    */

    if (ret) {
        logger.info(`[アップロード完了][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    }

    return ret;
}

/**
 * @param {[string]} translaters
 */
function getTranslaters(translaters) {
    let ret = [];
    translaters.forEach(translater => {
        switch (translater) {
            case "gunzip": {
                ret.push(createGunzip());
                break;
            }
            case "ndjson": {
                ret.push(parser());
                ret.push(new streamArray());
                ret.push(async function* (source) {
                    for await (const { value } of source) {
                        yield JSON.stringify(value) + "\n";
                    }
                });
                break;
            }
            case "decodeSJIS": {
                const { decodeStream } = iconv;
                ret.push(decodeStream('Shift_JIS'));
                break;
            }
            case "encodeUTF-8": {
                const { encodeStream } = iconv;
                ret.push(encodeStream('utf-8'));
                break;
            }
            case "getSalesAndTrafficReport": {
                ret.push(createGunzip());
                ret.push(parser());
                ret.push(new streamObject());
                ret.push(async function* (source) {
                    let reportSpecification = {};
                    for await (const { value } of source) {
                        let ret = "";
                        if ("reportType" in value) {
                            reportSpecification = value;
                        }
                        else if ("date" in value[0]) {
                        }
                        else {
                            value.forEach(v => v.reportSpecification = reportSpecification);
                            ret = value.map(v => JSON.stringify(v)).join("\n");
                        }
                        yield ret;
                    }
                });
                break;
            }
            case "getMerchantListingsAllData": {
                const map = {
                    "商品名": "item-name",
                    "商品の説明": "item-description",
                    "出品ID": "listing-id",
                    "出品者SKU": "seller-sku",
                    "価格": "price",
                    "数量": "quantity",
                    "出品日": "open-date",
                    //"":"image-url",
                    //"":"item-is-marketplace",
                    "商品IDタイプ": "product-id-type",
                    //"":"zshop-shipping-fee",
                    "コンディション説明": "item-note",
                    "コンディション": "item-condition",
                    //"":"zshop-category1",
                    //"":"zshop-browse-path",
                    //"":"zshop-storefront-feature",
                    "ASIN 1": "asin1",
                    "ASIN 2": "asin2",
                    "ASIN 3": "asin3",
                    "国外へ配送可": "will-ship-internationally",
                    "迅速な配送": "expedited-shipping",
                    //"":"zshop-boldface",
                    "商品ID": "product-id",
                    //"":"bid-for-featured-placement",
                    //"":"add-delete",
                    "在庫数": "pending-quantity",
                    "フルフィルメント・チャンネル": "fulfillment-channel",
                    "法人価格": "Business Price",
                    "数量割引のタイプ": "Quantity Price Type",
                    "数量の下限1": "Quantity Lower Bound 1",
                    "数量割引1": "Quantity Price 1",
                    "数量の下限2": "Quantity Lower Bound 2",
                    "数量割引2": "Quantity Price 2",
                    "数量の下限3": "Quantity Lower Bound 3",
                    "数量割引3": "Quantity Price 3",
                    "数量の下限4": "Quantity Lower Bound 4",
                    "数量割引4": "Quantity Price 4",
                    "数量の下限5": "Quantity Lower Bound 5",
                    "数量割引5": "Quantity Price 5",
                    "merchant-shipping-group": "merchant-shipping-group",
                    "出品価格の上限累積購入割引価格タイプ": "Progressive Price Type",
                    "累積購入割引下限": "Progressive Lower Bound 1",
                    "累積購入割引価格1": "Progressive Price 1",
                    "累積購入割引下限2": "Progressive Lower Bound 2",
                    "累積購入割引価格2": "Progressive Price 2",
                    "累積購入割引下限3": "Progressive Lower Bound 3",
                    "累積購入割引価格3": "Progressive Price 3",
                    "ステータス": "status",
                }
                ret.push(csv.parse({
                    delimiter: '\t',
                }));
                ret.push(async function* (source) {
                    let head = true;
                    const pattern = /[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/g;
                    for await (const data of source) {
                        if (head && data.some(d => Object.keys(map).includes(d))) {
                            head = false;
                            yield data.map(d => map[d]).join(",") + "\n";
                        }
                        else{
                            const arr = data.map(d => {
                                if(d.length >= 19 && pattern.test(d)){
                                    return `${d.slice(19)} ${d.slice(0, 19)}`.trim();
                                }
                                return d;
                            })
                            yield arr.join(",") + "\n";
                        }
                    }
                });
                break;
            }
            case "SBCampaign": {
                break;
            }
        }
    });
    return ret;
    // AmazonSpApiReport/シロクロ/2024-07-20/temp/GetMerchantListingsAllData.csv
}
