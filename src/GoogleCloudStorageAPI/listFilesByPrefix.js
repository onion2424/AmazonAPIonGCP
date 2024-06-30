import { combine } from "../Common/systemCommon.js";

export async function listFilesByPrefix(storage, bucketName, test, prefix, delimiter) {
  console.log(storage);
  console.log(bucketName);

  const options = {
    prefix: combine(test, prefix),
  };

  console.log(options.prefix);

  if (delimiter) {
    options.delimiter = delimiter;
  }

  // Lists files in the bucket, filtered by a prefix
  const [files] = await storage.bucket(bucketName).getFiles(options);

  console.log('Files:');
  files.forEach(file => {
    console.log(file.name);
  });
}