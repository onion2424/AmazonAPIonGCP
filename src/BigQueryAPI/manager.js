import { _, logger, systemInfo, utils } from "../Common/common.js";
import root from "../root.js"
import { loadFromGCS } from "./loadFromGCS.js"
import { createPartitionTable } from "./createPartitionTable.js";
import { BigQuery } from '@google-cloud/bigquery';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';

const test = systemInfo.isTest() ? "Test" : "";

const bigquery = new BigQuery({keyFilename: keyFilename});

class manager
{
    constructor()
    {

    }

    /**
     * GCSからファイルをロードし、テーブルを作成します。
     * @param {string} datasetId 
     * @param {string} tableId 
     * @param {File} file 
     */
    async loadFromGCS(datasetId, tableId, file){
        return loadFromGCS(bigquery, datasetId, tableId, file);
    }

    /**
     * パーティションテーブルを作成します。
     * @param {string} datasetId 
     * @param {string} tableId 
     * @param {object} options 
     * @returns 
     */
    async createPartitionTable(datasetId, tableId, options) {
        return createPartitionTable(bigquery, datasetId, tableId, options)
    }

}

logger.debug("import BigQueryAPI");

const instance = new manager();

_.set(root, ["BigQueryAPI"], instance);

export default instance;