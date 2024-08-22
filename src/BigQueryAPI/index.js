import {BigQuery} from "@google-cloud/bigquery"

const keyFilename = './AmazonApiServiceKey/amazon-api-report-07711e863385.json';

const bigquery = new BigQuery(
    {
        projectId: "amazon-api-report",
        keyFilename: keyFilename
    }
);

