import spManager from "../AmazonAdsAPI/Reporting/SponsoredAdsV3/SponsoredProducts/manager.js"
import sdManager from "../AmazonAdsAPI/Reporting/SponsoredAdsV3/SponsoredDisplay/manager.js"
import sbManager from "../AmazonAdsAPI/Reporting/SponsoredAdsV3/SponsoredBrands/manager.js"
import salesManager from "../AmazonSpAPI/ReportsAPI_v2021/GetSalesAndTrafficReport/manager.js"
import merchantManager from "../AmazonSpAPI/ReportsAPI_v2021/GetMerchantListingsAllData/manager.js"
import flatFileManager from "../AmazonSpAPI/ReportsAPI_v2021/GetFlatFileAllOrdersDataByOrderDateGeneral/manager.js"
import fbaManager from "../AmazonSpAPI/ReportsAPI_v2021/GetFbaMyiAllInventoryData/manager.js"

import { combine } from "../Common/systemCommon.js"
import storageManager from "../GoogleCloudStorageAPI/manager.js"


const wait = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec*1000);
    //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
  });
};

//uploadFile('./public/test.txt', 'test.txt').catch(console.error);

//moveFile('public/test.txt', 'public/old/test.txt').catch(console.error);


var today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));

var yesterday = new Date(today.getTime())
yesterday.setDate( yesterday.getDate() - 1);

var date = yesterday.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
console.log(date);

/*
// Sponsored Products
{
  console.log("Sponsored Products");

  let accesToken = await spManager.accessTokenFromRefreshToken();
  let create = await spManager.create(accesToken.access_token, date);
  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await spManager.status(accesToken.access_token, create.reportId);
  }while(status.status != 'COMPLETED' && count < 100);

  let download = await spManager.download(status.url, 'AmazonAdsApiReport/' + date + '/');
}
*/
// Sponsored Brands
{
  console.log("Sponsored Brands");

  let accesToken = await sbManager.accessTokenFromRefreshToken();

  let create = await sbManager.create(accesToken.access_token, date);

  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await sbManager.status(accesToken.access_token, create.reportId);
  }while(status.status != 'COMPLETED' && count < 100);
  
  let download = await sbManager.download(status.url, 'AmazonAdsApiReport/' + date + '/');
}

/*
// Sponsored Display
{
  console.log("Sponsored Display");

  let accesToken = await sdManager.accessTokenFromRefreshToken();

  let create = await sdManager.create(accesToken.access_token, date);

  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await sdManager.status(accesToken.access_token, create.reportId);
  }while(status.status != 'COMPLETED' && count < 100);
  
  let download = await sdManager.download(status.url, 'AmazonAdsApiReport/' + date + '/');
}


// GetSalesAndTrafficReport
{
  console.log("GetSalesAndTrafficReport");

  let accesToken = await salesManager.accessTokenFromRefreshToken();
  let create = await salesManager.create(accesToken.access_token, date + "T00:00:00.000Z", date + "T23:59:59.999Z");

  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await salesManager.status(accesToken.access_token, create.reportId);
  }while(status.processingStatus != 'DONE' && count < 100);

  let get = await salesManager.get(accesToken.access_token, status.reportDocumentId);

  await salesManager.download(get.url, 'AmazonSpApiReport/' + date + '/');
}


// GetMerchantListingAllData
{
  console.log("GetMerchantListingsAllData");
  let accesToken = await merchantManager.accessTokenFromRefreshToken();
  let create = await merchantManager.create(accesToken.access_token, date + "T00:00:00.000Z", date + "T23:59:59.999Z");

  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await merchantManager.status(accesToken.access_token, create.reportId);
  }while(status.processingStatus != 'DONE' && count < 100);

  let get = await merchantManager.get(accesToken.access_token, status.reportDocumentId);

  await merchantManager.download(get.url, 'AmazonSpApiReport/' + date + '/');
}


// GetFlatFileAllOrdersDataByOrderDateGeneral
{
  console.log("GetFlatFileAllOrdersDataByOrderDateGeneral");
  let accesToken = await flatFileManager.accessTokenFromRefreshToken();
  let create = await flatFileManager.create(accesToken.access_token, date + "T00:00:00.000Z", date + "T23:59:59.999Z");

  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await flatFileManager.status(accesToken.access_token, create.reportId);
  }while(status.processingStatus != 'DONE' && status.processingStatus != 'CANCELLED' && count < 100);

  if(status.processingStatus == "DONE")
    {
      let get = await flatFileManager.get(accesToken.access_token, status.reportDocumentId);

      await flatFileManager.download(get.url, 'AmazonSpApiReport/' + date + '/');
    }
  else
  {
    console.log("nothing data");
  }
}
*/

// GetFbaMyiAllInbentoryData おそらく1日数回何時間か空けて等の制限がある
{
  console.log("GetFbaMyiAllInventoryData");

  let accesToken = await fbaManager.accessTokenFromRefreshToken();
  let create = await fbaManager.create(accesToken.access_token, date + "T00:00:00.000Z", date + "T23:59:59.999Z");
  while(!create.reportId)
  {
    create = await flatFileManager.create(accesToken.access_token, date + "T00:00:00.000Z", date + "T23:59:59.999Z");
  }
  let count = 0;
  let status;
  do
  {
    // 10秒待つ
    count++;
    await wait(10);
    status = await fbaManager.status(accesToken.access_token, create.reportId);
  }while(status.processingStatus != 'DONE' && status.processingStatus != 'FATAL' && count < 100);
  
  if(status.processingStatus == 'DONE')
  {
    let get = await fbaManager.get(accesToken.access_token, status.reportDocumentId);

    await fbaManager.download(get.url, 'AmazonSpApiReport/' + date + '/');
  }
  else
  {
    console.log("rate limited");
  }
}
