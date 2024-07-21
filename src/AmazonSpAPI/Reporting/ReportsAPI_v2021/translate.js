import root from '../../../root.js';
import { _ , utils } from '../../../Common/common.js';
import { M_Account } from '../../../FireStoreAPI/Collection/M_Account/manager.js';
import { D_ReportRequest } from '../../../FireStoreAPI/Collection/D_ReportRequest/manager.js';
import { M_Request } from '../../../FireStoreAPI/Collection/M_Request/manager.js';
/**
 * 
 * @param {D_ReportRequest} drequest 
 * @param {M_Request} mrequest
 * @returns 
 */
export async function translate(drequest, mrequest)
{
    const accountDoc = await collectionManager.get(drequest.accountRef);
    /**
     * @type {M_Account}
     */
    const account = accountDoc.data();
  
    const detail = mrequest.details.find(d => d.refName == drequest.requestInfo.refName);

    // ファイル存在チェック
    

}