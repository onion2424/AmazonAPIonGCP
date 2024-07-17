import { utils } from '../Common/systemCommon.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';
import { logger } from '../Common/systemCommon.js';

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
 * @param {Array<>} streams 
 * @returns 
 */
export async function streamFileUpload(storage, bucketName, destFileName, streams) {
    logger.info(`[アップロード開始][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    let ret = true;

    const myBucket = storage.bucket(bucketName);

    //console.log(filepath);

    // Create a reference to a file object
    const file = myBucket.file(destFileName);
    const writable = file.createWriteStream();
    const readable = new chain(
        [
            ...streams
        ]);

    // pipeをつなぐ
    const end = new pipeline(readable, writable);

    // エラーハンドリング
    [...streams, writable].forEach((item) => {
        if ('on' in item) {
            item.on('error', (e) => {
                ret = false;
                logger.error('[GCPエラー][アップロード失敗][エラー内容表示]');
                logger.error(e);
            })
        }
    })

    //console.log('await ending');
    await end;
    //console.log('await ended');


    if (ret) {
        logger.info(`[アップロード完了][バケット名：${bucketName}][ファイル名：${destFileName}]`);
    }
    else {
        logger.error('エラー時処理');
    }

    return ret;
}
