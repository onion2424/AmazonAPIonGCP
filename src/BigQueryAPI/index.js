import {BigQuery} from "@google-cloud/bigquery"

const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';

const bigquery = new BigQuery(
    {
        projectId: "amazon-api-report",
        keyFilename: keyFilename
    }
);

