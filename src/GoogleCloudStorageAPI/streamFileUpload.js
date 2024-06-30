import { combine } from '../Common/systemCommon.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';

// Get a reference to the bucket


// Create a pass through stream from a string
// const passthroughStream = new stream.PassThrough();
// passthroughStream.write(contents);
// passthroughStream.end();

export async function streamFileUpload(storage, bucketName, test, destFileName, streams) {
    let ret = true;


    const filepath = combine(test, destFileName);

    const myBucket = storage.bucket(bucketName);

    //console.log(filepath);

    // Create a reference to a file object
    const file = myBucket.file(filepath);
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
        console.log(`${filepath} uploaded to ${bucketName}`);
    else
        console.log('エラー時処理');
    
    return ret;
}
