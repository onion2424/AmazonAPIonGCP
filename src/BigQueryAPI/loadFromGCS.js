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
export async function loadFromGCS(bigquery, datasetId, tableId, file) {
  tableId = datasetId + "_" + tableId;
  logger.info(`[テーブル作成開始][${tableId}]`);
  // Imports a GCS file into a table with manually defined schema.
  // Configure the load job. For full list of options, see:
  // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
  const extension = path.extname(file.name).slice(1).toUpperCase();
  const metadata = {
    sourceFormat: extension == "JSON" ? "NEWLINE_DELIMITED_JSON" : extension,
    autodetect: true,
  };

  if (extension == "CSV") {
    metadata.skipLeadingRows = 1;
  }

  // テスト時
  if(systemInfo.isTest()){
    datasetId = 'test';
  }
  
  // テーブル存在確認
  const dataset = bigquery.dataset(datasetId);
  try {
    await dataset.table(tableId).get();
    // 存在するなら削除
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .delete();
    logger.info(`[テーブル削除(old)][${datasetId}][${tableId}]`);

  } catch (e) {
  }

  // Load data from a Google Cloud Storage file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
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
