import { systemInfo, utils } from "../Common/common.js";
import { moveFile } from "./moveFile.js";
import { streamFileUpload, streamFileUpload2 } from "./streamFileUpload.js";
import { uploadFile } from "./uploadFile.js";
import { listFilesByPrefix } from "./listFilesByPrefix.js";
import { downloadIntoMemory } from "./downloadIntoMemory.js"
import root from "../root.js"
import { _, logger } from "../Common/common.js";

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';

// Creates a client
const keyFilename = './AmazonApiServiceKey/amazon-api-report-07711e863385.json';
const bucketName = 'amazon-api-report';
const storage = new Storage({ keyFilename: keyFilename });

const test = systemInfo.isTest() ? "Test" : "";

class manager {
    constructor() {
        this.uploadFile = uploadFile;
    }

    /**
     * ファイルを移動します。
     * @param {string} srcFileName 
     * @param {string} destFileName 
     * @returns 
     */
    async moveFile(srcFileName, destFileName) {
        // Testはこの時点で付与されている前提
        return moveFile(storage, bucketName, srcFileName, destFileName);
    }

    /**
     * ファイルをストリーミングアップロードします。
     * @param {string} destFileName 
     * @param {ReadableStream} readable
     * @param {[string]} translaters
     * @param {string} dateStr
     */
    async streamFileUpload(destFileName, readable, translaters, dateStr) {
        return streamFileUpload(storage, bucketName, utils.combine(test, destFileName), readable, translaters, dateStr);
    }

    /**
     * ファイルをストリーミングアップロードします。
     * @param {string} destFileName 
     * @param {ReadableStream} readable
     * @param {[string]} translaters
     * @param {string} dateStr
     */
    async streamFileUpload2(destFileName, readable, translaters, dateStr, length) {
        return streamFileUpload2(storage, bucketName, utils.combine(test, destFileName), readable, translaters, dateStr, length);
    }

    /**
     * プレフィックスを指定し、ファイル名一覧を取得します。
     * @param {string} prefix 
     * @param {string} delimiter 
     */
    async listFilesByPrefix(prefix, delimiter) {
        return listFilesByPrefix(storage, bucketName, utils.combine(test, prefix), delimiter);
    }

    /**
     * ファイルをオンメモリします。
     * @param {string} fileName 
     */
    async downloadIntoMemory(fileName) {
        // Testはこの時点で付与されている前提
        //fileName = isConsiderTest ? utils.combine(fileName) : fileName;
        return downloadIntoMemory(storage, bucketName, fileName);
    }
}

logger.debug("import GoogleCloudStorageAPI");

const instance = new manager();

_.set(root, ["GoogleCloudStorageAPI"], instance);

export default instance;