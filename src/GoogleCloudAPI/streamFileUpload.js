/**
 * TODO(developer): Uncomment the following lines before running the sample
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The new ID for your GCS file
// const destFileName = 'your-new-file-name';

// The content to be uploaded in the GCS file
// const contents = 'your file content';

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';
const bucketName = 'amazon-api-report';

// Creates a client
const storage = new Storage({keyFilename: keyFilename});

// Get a reference to the bucket
const myBucket = storage.bucket(bucketName);

// Create a pass through stream from a string
// const passthroughStream = new stream.PassThrough();
// passthroughStream.write(contents);
// passthroughStream.end();

export async function streamFileUpload(destFileName, streams) {
    let ret = true;

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
