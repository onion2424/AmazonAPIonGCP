import { systemInfo, utils } from "../Common/systemCommon.js";
import { moveFile } from "./moveFile.js";
import { streamFileUpload } from "./streamFileUpload.js";
import { uploadFile } from "./uploadFile.js";
import { listFilesByPrefix } from "./listFilesByPrefix.js";
import { downloadIntoMemory } from "./downloadIntoMemory.js"
import root from "../root.js"
import { _, logger } from "../Common/systemCommon.js";

// Imports the Google Cloud client library
import {Storage} from '@google-cloud/storage';

// Creates a client
const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';
const bucketName = 'amazon-api-report';
const storage = new Storage({keyFilename: keyFilename});

const test = systemInfo.isTest() ? "Test" : "";

class manager
{
    constructor()
    {
        this.uploadFile = uploadFile;
    }

    async moveFile(srcFileName, destFileName)
    {
        // Testはこの時点で付与されている前提
        return moveFile(storage, bucketName, srcFileName, destFileName);   
    }

    /**
     * 
     * @param {string} destFileName 
     * @param {Array<ReadableStream|any>} stream 
     */
    async streamFileUpload(destFileName, stream)
    {
        return streamFileUpload(storage, bucketName, utils.combine(test, destFileName), stream);
    }

    /**
     * 
     * @param {string} prefix 
     * @param {string} delimiter 
     */
    async listFilesByPrefix(prefix, delimiter)
    {
        return listFilesByPrefix(storage, bucketName, utils.combine(test, prefix), delimiter);
    }

    /**
     * 
     * @param {string} fileName 
     */
    async downloadIntoMemory(fileName)
    {
        // Testはこの時点で付与されている前提
        //fileName = isConsiderTest ? utils.combine(fileName) : fileName;
        return downloadIntoMemory(storage, bucketName, fileName);
    }
}

logger.debug("import GoogleCloudStorageAPI");

const instance = new manager();

_.set(root, ["GoogleCloudStorageAPI"], instance);

export default instance;