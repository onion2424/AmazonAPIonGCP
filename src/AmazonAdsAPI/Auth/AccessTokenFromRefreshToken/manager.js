import root from "../../../root.js"
import { _, logger, dayjs } from "../../../Common/common.js";
import { get } from "./get.js";
import { M_Account } from "../../../FireStoreAPI/Collection/M_Account/manager.js";
import M_TokenManager, { M_Token } from "../../../FireStoreAPI/Collection/M_Token/manager.js";
import collectionManager from "../../../FireStoreAPI/Collection/manager.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"

class manager{
    constructor(){

    }
    /**
     * @param {M_Account} account
     * @returns {Promise<M_Token>}
     */
    async get(account){
        const tokenDoc = await collectionManager.get(account.token.ads_token.ref);
        /**
         * @type {M_Token}
         */
        const token = tokenDoc.data();
        
        if(dayjs(token.expiration.toDate()) < dayjs()){
            // Token更新
            const clientId = account.token.ads_token.client_id;
            const clientSecret = account.token.ads_token.client_secret;
            const refreshToken = account.token.ads_token.refresh_token;
            const newToken = await get(clientId, clientSecret, refreshToken);
            await fireStoreManager.updateRef(tokenDoc.ref, M_TokenManager.create(newToken));
            // キャッシュ削除（次回再キャッシュ）
            const doc = await collectionManager.recache(tokenDoc);
            return doc.data();
        }
        
        return token;
    }
}

logger.debug("import AmazonAdsAPI/Auth/AccessTokenFromRefreshToken");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"], instance);

export default instance;