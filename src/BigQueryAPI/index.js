import {BigQuery} from "@google-cloud/bigquery"

const keyFilename = './AmazonApiServiceKey/amazon-api-report-firebase-adminsdk-semvr-dfdb5719d0.json';

const bigquery = new BigQuery(
    {
        projectId: "amazon-api-report",
        keyFilename: keyFilename
    }
);

