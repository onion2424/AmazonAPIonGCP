import { Storage } from '@google-cloud/storage';
import L_ErrorManager from "../FireStoreAPI/Collection/L_Error/manager.js";

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
    const contents = await storage.bucket(bucketName).file(fileName).download()
    .catch(async e => {
        await L_ErrorManager.onGCSError(e, null);
        throw e;
    });

    // console.log(
    //     `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
    // );

    return contents;
}