import { systemInfo, utils } from '../Common/common.js';
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
import pick from "stream-json/filters/Pick.js";
import iconv from 'iconv-lite';
import * as csv from 'fast-csv';
import L_ErrorManager from "../FireStoreAPI/Collection/L_Error/manager.js";
import { Readable } from 'node:stream';
import fs from "node:fs"

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
    const writable = file.createWriteStream({ timeout: 1000 * 60 * 60, });
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
        .catch(async (e) => {
            ret = false;
            writable.end();
            await L_ErrorManager.onGCSError(e, null);
            throw e;
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
 * 
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} destFileName 
 * @param {ReadableStream} readable
 * @param {[string]} translaters 
 * @returns 
 */
export async function streamFileUpload2(storage, bucketName, destFileName, readable, translaters, dateStr) {
    logger.info(`[アップロード開始][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    let ret = false;

    const myBucket = storage.bucket(bucketName);

    // Create a reference to a file object
    const file = myBucket.file(destFileName);
    const writable = file.createWriteStream({ timeout: 1000 * 60 * 60, });
    //const writable = fs.createWriteStream("./test.gz");

    const test = new Promise((resolve, reject) => {
        readable.on("readable", () => {
            let data;
            while ((data = readable.read()) !== null) {
                let pause = writable.write(data);
                if (pause)
                    readable.pause();
            }
        }).on("end", () => {
            writable.end();
            resolve(true);
        })
            .on("drain", () => {
                readable.resume();
            })
            .on("error", () => {
                writable.end();
                reject(false);
            });
    })

    ret = await test;

    if (ret) {
        logger.info(`[アップロード完了][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    }

    return ret;
}

/**
 * onMemory ver
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} destFileName 
 * @param {Readable} readable
 * @param {[string]} translaters 
 * @returns 
 */
export async function streamFileUpload3(storage, bucketName, destFileName, readable, translaters, dateStr) {
    let ret = false;
    let data = [];
    const test = new Promise((resolve, reject) => {
        let pipes = getTranslaters(translaters, dateStr);
        // let stream = readable;
        // for (const pipe of pipes) {
        //     stream = stream.pipe(pipe);
        // }
        let count = 0;
        readable
            .on("data", (val) => {
                if (val?.value.length)
                    data = val.value;
            })
            .on("error", (val) => reject())
            .on("finish", (val) => {
                ret = false;
                resolve();
            });
    });
    await test;

    const array = [];

    const myBucket = storage.bucket(bucketName);

    const file = myBucket.file(destFileName);
    const writable = file.createWriteStream();


    let json = [];
    let obj;
    let clickShareRank = 0;
    for await (const value of data) {
        clickShareRank = value.clickShareRank;
        if (clickShareRank == 1) {
            obj = {};
            obj.partition_date = dateStr;
            obj.searchFrequencyRank = value["searchFrequencyRank"];
            obj.searchTerm = value["searchTerm"];
        }
        obj[`clickedAsin${clickShareRank}`] = value["clickedAsin"];
        obj[`clickedItemName${clickShareRank}`] = value["clickedItemName"];
        obj[`clickShareRank${clickShareRank}`] = value["clickShareRank"];
        obj[`clickShare${clickShareRank}`] = value["clickShare"];
        obj[`conversionShare${clickShareRank}`] = value["conversionShare"];
        if (clickShareRank == 3) {
            json.push(obj);
        }
    }

    logger.info(`[アップロード開始][バケット名：${bucketName}][ファイル名：${destFileName}]`);

    const test2 = new Promise((resolve, reject) => {
        writable
            .on("error", (val) => reject())
            .on("finish", (val) => {
                ret = true;
                resolve();
            });
        writable.end(json.map((o) => JSON.stringify(o)).join("\n"));
    });
    await test2;

    if (ret) {
        logger.info(`[アップロード完了][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    }
    else {
        logger.info(`[アップロード失敗][バケット名：${bucketName}][ファイル名：${destFileName}]`)
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
                        if (!Array.isArray(value) && "reportType" in value) {
                            reportSpecification = value;
                        }
                        else if (Array.isArray(value) && value.length && "date" in value[0]) {
                        }
                        else if (Array.isArray(value) && value.length && "childAsin" in value[0]) {
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
                            return [...headerArray.map((d) => replace(map2[map1.indexOf(d)])), "partition_date"];
                        } else {
                            return [...headerArray.map((d) => replace(d)), "partition_date"];
                        }
                    }
                }));
                ret.push(async function* (source) {
                    //const pattern = /[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/g;
                    for await (const data of source) {
                        data.cluster_asin = data.asin1 || data.product_id;
                        data.partition_date = dateStr;
                        data.open_date = data.open_date.slice(0, 19);
                        yield `${JSON.stringify(data)}` + "\n";
                    }
                });
                break;
            }
            case "GetFlatFileAllOrdersDataByOrderDateGeneral":
            case "GetFbaMyiAllInventoryData": {
                ret.push(csv.parse({
                    delimiter: '\t',
                    headers: (headerArray) => [...headerArray.map((d) => replace(d)), "partition_date"]
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
            case "GetBrandAnalysticsSearchTermsReport": {
                ret.push(parser());
                ret.push(pick.pick({ filter: "dataByDepartmentAndSearchTerm" }));
                ret.push(new streamArray);
                ret.push(async function* (source) {
                    let obj;
                    let clickShareRank = 0;
                    for await (const { value } of source) {
                        clickShareRank = value.clickShareRank;
                        if (clickShareRank == 1) {
                            obj = {};
                            obj.partition_date = dateStr;
                            obj.searchFrequencyRank = value["searchFrequencyRank"];
                            obj.searchTerm = value["searchTerm"];
                        }
                        obj[`clickedAsin${clickShareRank}`] = value["clickedAsin"];
                        obj[`clickedItemName${clickShareRank}`] = value["clickedItemName"];
                        obj[`clickShareRank${clickShareRank}`] = value["clickShareRank"];
                        obj[`clickShare${clickShareRank}`] = value["clickShare"];
                        obj[`conversionShare${clickShareRank}`] = value["conversionShare"];
                        if (clickShareRank == 3) {
                            yield JSON.stringify(obj) + "\n";
                        } else {
                            yield "";
                        }
                    }
                });
                break;
            }
        }
    });
    return ret;
}

function replace(str) {
    return str.replace(/\W/g, "_");
}
