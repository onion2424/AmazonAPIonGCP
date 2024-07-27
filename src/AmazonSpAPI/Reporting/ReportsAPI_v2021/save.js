import root from '../../../root.js';
import { _, utils, amazonCommon, logger, dayjs } from '../../../Common/common.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
import storageManager from "../../../GoogleCloudStorageAPI/manager.js"
import M_ErrorManager from '../../../FireStoreAPI/Collection/M_Error/manager.js';
import collectionManager from "../../../FireStoreAPI/Collection/manager.js";
import bigQueryManager from "../../../BigQueryAPI/manager.js"

/**
 * 
 * @param {D_ReportRequest} drequest 
 * @param {M_Request} mrequest
 * @returns 
 */
export async function save(drequest, mrequest) {
    const accountDoc = await collectionManager.get(drequest.accountRef);
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();

    const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);

    // ファイル存在チェック
    var list = await storageManager.listFilesByPrefix(drequest.reportInfo.filepath, "/");
    if (!list.length) {
        // エラー
        const error = M_ErrorManager.create();
        error.handle = "FireStoreAPI/Collection/M_Error/Handle/downloadStatus";
        error.tag = "ファイル取得失敗";
        return { ok: "error", error: error };
    }

    const file = list[0];

    const separate = "$";

    const created = await bigQueryManager.loadFromGCS(detail.settings.save.tableName, `${account.tag}${separate}${dayjs(drequest.requestInfo.date.start).format("YYYYMMDD")}`, file);

    const reportInfo = structuredClone(drequest.reportInfo);
    if(file.metadata.size == "0"){
        logger.info(`[テーブル作成パス][ファイルサイズ=0][${file.name}]`);
        reportInfo.continue = 0;
        return { ok: "ok", reportInfo: reportInfo, next: true };
    }

    // ステータス更新
    if (created) {
        reportInfo.continue = 0;
        return { ok: "ok", reportInfo: reportInfo, next: true };
    }
    
    // エラー
    const error = M_ErrorManager.create();
    error.tag = "不明なエラー";
    return { ok: "error", error: error };
}