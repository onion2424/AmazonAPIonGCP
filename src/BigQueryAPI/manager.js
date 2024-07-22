import { _, logger, systemInfo, utils } from "../Common/common.js";
import root from "../root.js"
import { loadFromGCS } from "./loadFromGCS.js"
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
     * 
     * @param {string} datasetId 
     * @param {string} tableId 
     * @param {File} file 
     */
    async loadFromGCS(datasetId, tableId, file){
        return loadFromGCS(bigquery, datasetId, tableId, file);
    }
}

logger.debug("import BigQueryAPI");

const instance = new manager();

_.set(root, ["BigQueryAPI"], instance);

export default instance;