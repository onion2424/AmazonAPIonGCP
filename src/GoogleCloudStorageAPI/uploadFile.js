import {Storage} from '@google-cloud/storage';
import {readdirSync} from 'fs';

// Change to your bucket name
const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';
const bucketName = 'amazon-api-report';

const storage = new Storage({keyFilename: keyFilename});

export async function uploadFile(path, filename) {
  // Path where to save the file in Google Cloud Storage.
  const destFileName = `public/${filename}`;

  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    //preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };
  // The `path` here is the location of the file that you want to upload.
  await storage.bucket(bucketName).upload(path, options);
}