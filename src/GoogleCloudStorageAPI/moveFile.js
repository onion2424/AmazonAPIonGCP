import { Storage } from '@google-cloud/storage';
import L_ErrorManager from "../FireStoreAPI/Collection/L_Error/manager.js";

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
    .move(destFileName, moveOptions)
    .catch(async e => {
      await L_ErrorManager.onGCSError(e, null);
      throw e;
  });
}