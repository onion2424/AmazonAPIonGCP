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
export async function streamFileUpload(storage, bucketName, destFileName, readable, translaters, dateStr) {
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
    await pipeline(readable, ...getTranslaters(translaters, dateStr), writable)
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
 * @param {string} dateStr
 */
function getTranslaters(translaters, dateStr) {
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
            case "spAdvertisedProduct": {
                ret.push(parser());
                ret.push(new streamArray());
                ret.push(async function* (source) {
                    for await (const { value } of source) {
                        value.partition_date = dateStr;
                        value.cluster_asin = value.advertisedAsin;
                        yield JSON.stringify(value) + "\n";
                    }
                });
                break;
            }
            case "sdAdvertisedProduct": {
                ret.push(parser());
                ret.push(new streamArray());
                ret.push(async function* (source) {
                    for await (const { value } of source) {
                        value.partition_date = dateStr;
                        value.cluster_asin = value.promotedAsin;
                        yield JSON.stringify(value) + "\n";
                    }
                });
                break;
            }
            case "sbCampaigns": {
                ret.push(parser());
                ret.push(new streamArray());
                ret.push(async function* (source) {
                    for await (const { value } of source) {
                        value.partition_date = dateStr;
                        value.cluster_asin = value.campaignName.slice(-10);
                        yield JSON.stringify(value) + "\n";
                    }
                });
                break;
            }
            case "getSalesAndTrafficReport": {
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
                            value.forEach(v => { v.reportSpecification = reportSpecification; v.partition_date = dateStr; v.cluster_asin = v.childAsin });
                            ret = value.map(v => JSON.stringify(v)).join("\n");
                        }
                        yield ret;
                    }
                });
                break;
            }
            case "getMerchantListingsAllData": {
                const map1 = ["出品者SKU", "ASIN 1", "商品名", "商品の説明", "出品ID", "価格", "数量", "出品日", "商品IDタイプ", "コンディション説明", "コンディション", "国外へ配送可", "迅速な配送", "商品ID", "在庫数", "フルフィルメント・チャンネル", "法人価格", "数量割引のタイプ", "数量の下限1", "数量割引1", "数量の下限2", "数量割引2", "数量の下限3", "数量割引3", "数量の下限4", "数量割引4", "数量の下限5", "数量割引5", "使用しない支払い方法", "配送日時指定SKUリスト", "merchant-shipping-group", "ポイント", "商品税コード", "ステータス", "出品価格の下限", "出品価格の上限", "累積購入割引価格タイプ", "累積購入割引下限1", "累積購入割引価格1", "累積購入割引下限2", "累積購入割引価格2", "累積購入割引下限3", "累積購入割引価格3", "調達タイプ"];
                const map2 = ["seller-sku", "asin1", "item-name", "item-description", "listing-id", "price", "quantity", "open-date", "product-id-type", "item-note", "item-condition", "will-ship-internationally", "expedited-shipping", "product-id", "pending-quantity", "fulfillment-channel", "Business Price", "Quantity Price Type", "Quantity Lower Bound 1", "Quantity Price 1", "Quantity Lower Bound 2", "Quantity Price 2", "Quantity Lower Bound 3", "Quantity Price 3", "Quantity Lower Bound 4", "Quantity Price 4", "Quantity Lower Bound 5", "Quantity Price 5", "optional-payment-type-exclusion", "scheduled-delivery-sku-set", "merchant-shipping-group", "standard-price-point", "ProductTaxCode", "status", "minimum-seller-allowed-price", "maximum-seller-allowed-price", "Progressive Price Type", "Progressive Lower Bound 1", "Progressive Price 1", "Progressive Lower Bound 2", "Progressive Price 2", "Progressive Lower Bound 3", "Progressive Price 3", "Sourcing Type"];
                ret.push(csv.parse({
                    delimiter: '\t',
                    headers: (headerArray) => {
                        if (headerArray.some(d => d == "商品名")) {
                            return [...headerArray.map((d) => map2[map1.indexOf(d)]), "partition_date"];
                        } else {
                            return [...headerArray, "partition_date"];
                        }
                    }
                }));
                ret.push(async function* (source) {
                    let head = false;
                    const pattern = /[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/g;
                    for await (const data of source) {
                        data.cluster_asin = data.asin1;
                        data.partition_date = dateStr;
                        yield `${JSON.stringify(data)}` + "\n";
                    }
                });
                break;
            }
            case "GetFlatFileAllOrdersDataByOrderDateGeneral":
            case "GetFbaMyiAllInventoryData": {
                ret.push(csv.parse({
                    delimiter: '\t',
                    headers: (headderArray) => [...headderArray, "partition_date"]
                }));
                ret.push(async function* (source) {
                    for await (const data of source) {
                        data.cluster_asin = data.asin;
                        data.partition_date = dateStr;
                        yield `${JSON.stringify(data)}` + "\n";
                    }
                });
                break;
            }
        }
    });
    return ret;
}
