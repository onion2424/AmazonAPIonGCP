import { v2 } from "@google-cloud/run";
import { ExecutionsClient } from "@google-cloud/run";
import { systemInfo } from "./Common/common.js";
  // Instantiates a client
 
  // IAMからamazon-api-reportリソースに対して、サービスアカウントにcloudRun管理者権限を付与したら使えた
  const keyFilename = './AmazonApiServiceKey/amazon-api-report-48665c60d888.json';


  const runClient = new ExecutionsClient({keyFilename: keyFilename});


 /**
   *  Maximum number of Executions to return in this call.
   */
   const pageSize = 10;
  /**
   *  A page token received from a previous call to ListExecutions.
   *  All other parameters must match.
   */
   const pageToken = 'abc123';
  /**
   *  If true, returns deleted (but unexpired) resources along with active ones.
   */

  const showDeleted = true


  async function isOtherExecutionRunning(prefix) {
    prefix = systemInfo.isTest() ? "test-" + prefix : prefix;

    const parent = 'projects/amazon-api-report/locations/asia-northeast1/jobs/' + prefix;
    
    // Construct request
    const request = {
      parent,
      pageSize
    };
    const executionName = process.env.CLOUD_RUN_EXECUTION;

    // Run request
    const iterable = runClient.listExecutionsAsync(request);
    for await (const response of iterable) {
        if(response.completionTime!="")
        {
            console.log("completesd: " + response.name);
            continue;
        }
        else if(response.name == executionName)
        {
            console.log("this is " + executionName);
            continue;
        }
        else if(response.name.startsWith(prefix))
        {
            return true;
        }
    }

    return false;
  }

  isOtherExecutionRunning("report-receive-run");
  // [END run_v2_generated_Executions_ListExecutions_async]
