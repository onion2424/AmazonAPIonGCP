import { Storage } from "@google-cloud/storage";
import L_ErrorManager from "../FireStoreAPI/Collection/L_Error/manager.js";

/**
 * 
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} prefix 
 * @param {string} delimiter 
 * @returns 
 */
export async function listFilesByPrefix(storage, bucketName, prefix, delimiter) {
  const options = {
    prefix: prefix,
  };


  if (delimiter) {
    options.delimiter = delimiter;
  }

  // Lists files in the bucket, filtered by a prefix
  let [files] = await storage.bucket(bucketName).getFiles(options)
  .catch(async e => {
    await L_ErrorManager.onGCSError(e, null);
    throw e;
  });

  //console.log('Files:');
  files = files.filter(file => file.name.slice(-1) !== "/");
  
  return files;
}