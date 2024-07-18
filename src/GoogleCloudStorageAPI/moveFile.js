import { utils } from '../Common/common.js';
import { Storage } from '@google-cloud/storage';
import chain from "stream-chain";
import { pipeline } from 'node:stream/promises';
import { logger } from '../Common/common.js';

/**
 * 
 * @param {Storage} storage 
 * @param {string} bucketName 
 * @param {string} srcFileName
 * @param {string} destFileName 
 * @returns 
 */
export async function moveFile(storage, bucketName, srcFileName, destFileName) {
  // Optional:
  // Set a generation-match precondition to avoid potential race conditions
  // and data corruptions. The request to copy is aborted if the object's
  // generation number does not match your precondition. For a destination
  // object that does not yet exist, set the ifGenerationMatch precondition to 0
  // If the destination object already exists in your bucket, set instead a
  // generation-match precondition using its generation number.
  const moveOptions = {
    preconditionOpts: {
      //ifGenerationMatch: destinationGenerationMatchPrecondition,
    },
  };

  // Moves the file within the bucket
  await storage
    .bucket(bucketName)
    .file(srcFileName)
    .move(destFileName, moveOptions);
}