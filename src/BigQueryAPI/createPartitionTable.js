import { BigQuery } from '@google-cloud/bigquery';
import { _, dayjs, logger, systemInfo } from '../Common/common.js';
import { File } from '@google-cloud/storage';
import * as path from "path";

/**
 * 
 * @param {BigQuery} bigquery
 * @param {string} datasetId 
 * @param {string} tableId 
 * @param {object} options 
 */
export async function createPartitionTable(bigquery, datasetId, tableId, options) {
    tableId = datasetId + "_" + tableId;
    logger.info(`[テーブル作成開始][${datasetId}][${tableId}]`);
    // Imports a GCS file into a table with manually defined schema.
    // Configure the load job. For full list of options, see:
    // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad

    // テスト時
    if (systemInfo.isTest()) {
        datasetId = 'test';
    }

    // テーブル存在確認
    const dataset = bigquery.dataset(datasetId);
    try {
        await dataset.table(tableId).get();
        // 存在するなら削除
        if (systemInfo.isTest()) {
            await bigquery
                .dataset(datasetId)
                .table(tableId)
                .delete();
            logger.info(`[テーブル削除(old)][${datasetId}][${tableId}]`);
        }
        else{
            logger.info(`[テーブル作成パス][${datasetId}][${tableId}]`);
            return;
        }

    } catch (e) {

    }

    const [job] = await bigquery
        .dataset(datasetId)
        .createTable(tableId, options);

    // Check the job's status for errors
    const errors = job.status?.errors;
    if (errors && errors.length > 0) {
        logger.error(`[テーブル作成失敗][${datasetId}][${tableId}]`);
        throw new Error("強制処理中断");
    }

    // load() waits for the job to finish
    logger.info(`[テーブル作成完了][${datasetId}][${tableId}]`);

    return true;
}
