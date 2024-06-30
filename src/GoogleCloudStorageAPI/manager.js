import { isDebug } from "../Common/systemCommon.js";
import { moveFile } from "./moveFile.js";
import { streamFileUpload } from "./streamFileUpload.js";
import { uploadFile } from "./uploadFile.js";
import { listFilesByPrefix } from "./listFilesByPrefix.js";

// Imports the Google Cloud client library
import {Storage} from '@google-cloud/storage';

// Creates a client
const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';
const bucketName = 'amazon-api-report';

const storage = new Storage({keyFilename: keyFilename});

const test = isDebug ? "Test" : "";

class manager
{
    constructor()
    {
        this.moveFile = moveFile;
        this.streamFileUpload = streamFileUpload.bind(this, storage, bucketName, test);
        this.uploadFile = uploadFile;
        this.listFilesByPrefix = listFilesByPrefix.bind(this, storage, bucketName, test);
    }
}

export default new manager();