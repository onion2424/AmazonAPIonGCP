import { utils } from '../Common/common.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';
import { logger } from '../Common/common.js';
import { finished } from 'node:stream/promises';
import { createGunzip } from 'zlib';
import parser from "stream-json";
import streamArray from "stream-json/streamers/StreamArray.js"
import iconv from 'iconv-lite';
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
                        yield JSON.stringify(value);
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
                ret.push(parser());
                ret.push(new streamArray());
                ret.push(async function* (source) {
                    let reportSpecification = {};
                    for await (const { value } of source) {
                        if ("reportSpecification" in value) {
                            reportSpecification = value;
                            yield "";
                        }
                        else if ("salesAndTrafficByDate" in value) {
                            yield "";
                        }
                        else if ("salesAndTrafficByAsin" in value) {
                            yield JSON.stringify(value);
                        }
                        yield JSON.stringify(value);
                    }
                });
                break;
            }
        }
    });
    return ret;
}
