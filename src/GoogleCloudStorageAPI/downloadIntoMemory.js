import { Storage } from '@google-cloud/storage';

/**
 * 
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} fileName 
 * @returns 
 */
export async function downloadIntoMemory(storage, bucketName, fileName) {
    //fileName = combine(test, fileName); // 不要
    // Downloads the file into a buffer in memory.
    const contents = await storage.bucket(bucketName).file(fileName).download();

    // console.log(
    //     `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
    // );

    return contents;
}