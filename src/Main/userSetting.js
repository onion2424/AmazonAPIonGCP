import storageManager from "../GoogleCloudStorageAPI/manager.js"

import Ajv from 'ajv'
const ajv = new Ajv();

for(var i = 0;i < process.argv.length; i++){
    console.log("argv[" + i + "] = " + process.argv[i]);
  }

// まずファイルを探す
// amazon-api-report/Environment/Firestore/user/
var list = await storageManager.listFilesByPrefix("/Environment/FireStore/User/");


// ループする
// --
list.foreach(val => console.log(val));
// Typeを見る
// CREATE|UPDATE|DELETE

// CREATEの場合
// Auth⇒Profile⇒Auth⇒Fees
// CREATE

// UPDATEの場合
// documentIDの有無
// SellerIDが不変なこと(これがキー？)
// Auth⇒Profile⇒Auth⇒Fees
// UPDATE

// DELETEの場合
// documentIDの有無
// SellerIDが不変なこと
// DELETE


// それ以外の場合エラーで終了



// --

const scehma =
{
    "type": "object",
    "properties": {
        "command": {"type": "enum" ["CREATE","UPDATE","DELETE"]},
        "name": {"type": "string"},
        "sellerID":{"type" : "string"},
        "Ads-API": {
            "type" : "object",
            "properties": {
                "document_id": {"type": "string"},
                "client_id": {"type": "string"},
                "client_secret": {"type": "string"},
                "refresh_token": {"type": "string"},
            }

        },

        "SP-API":
        {
            "type" : "object",
            "properties": {
                "document_id": {"type": "string"},
                "client_id": {"type": "string"},
                "client_secret": {"type": "string"},
                "refresh_token": {"type": "string"},
                "market_place": {"type": "string"},
            }
        }
    }
}