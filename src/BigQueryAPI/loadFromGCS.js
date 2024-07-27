import { BigQuery } from '@google-cloud/bigquery';
import { _, dayjs, logger, systemInfo } from '../Common/common.js';
import { File } from '@google-cloud/storage';
import * as path from "path";

/**
 * 
 * @param {BigQuery} bigquery
 * @param {string} datasetId 
 * @param {string} tableId 
 * @param {File} file 
 */
export async function loadFromGCS(bigquery, datasetId, tableId, file, ) {
  tableId = datasetId + "_" + tableId;
  logger.info(`[テーブル作成開始][${tableId}]`);
  // Imports a GCS file into a table with manually defined schema.
  // Configure the load job. For full list of options, see:
  // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
  const extension = path.extname(file.name).slice(1).toUpperCase();
  const metadata = {
    sourceFormat: extension == "JSON" ? "NEWLINE_DELIMITED_JSON" : extension,
    autodetect: false,
    ignoreUnknownValues: true,
    writeDisposition: 'WRITE_TRUNCATE',
  };

  if (extension == "CSV") {
    metadata.skipLeadingRows = 1;
  }

  const tableOptions = {
    timePartitioning: {
      type: "DAY"
    }
  }

  // テスト時
  if (systemInfo.isTest()) {
    datasetId = 'test';
  }

  // Load data from a Google Cloud Storage file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId, tableOptions)
    .load(file, metadata);


  // Check the job's status for errors
  const errors = job.status?.errors;
  if (errors && errors.length > 0) {
    logger.error(`[テーブル作成失敗][${tableId}]`);
    return false;
  }

  // load() waits for the job to finish
  logger.info(`[テーブル作成完了][${tableId}]`);

  return true;
}
