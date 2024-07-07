import { utils } from '../Common/systemCommon.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';

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
    [...streams, writable].forEach((item) =>
    {
        if('on' in item)
        {
            item.on('error', () => 
            {
                console.log('on error');
                ret = false;
            })
        }
    })

    //console.log('await ending');
    await end;
    //console.log('await ended');


    if(ret)
        console.log(`${destFileName} uploaded to ${bucketName}`);
    else
        console.log('エラー時処理');
    
    return ret;
}
