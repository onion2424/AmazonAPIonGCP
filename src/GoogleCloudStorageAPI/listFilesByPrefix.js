import { utils } from "../Common/systemCommon.js";
import { Storage } from "@google-cloud/storage";

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
  let [files] = await storage.bucket(bucketName).getFiles(options);

  //console.log('Files:');
  files = files.filter(file => file.name.slice(-1) !== "/");
  
  return files;
}