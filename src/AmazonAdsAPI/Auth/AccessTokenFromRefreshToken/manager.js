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

    async get(accountDoc){
        const account = accountDoc.data();
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
            const res = await get(clientId, clientSecret, refreshToken);
            if(res.ok == "ok"){
                const newToken = res.token;
                await fireStoreManager.updateRef(tokenDoc.ref, M_TokenManager.create(newToken));
                // 再キャッシュ
                const doc = await collectionManager.recache(tokenDoc);
                return { ok:"ok", token: doc.data()};
            }
            return res;
        }else{
            return { ok:"ok", token: token};
        }   
    }
}

logger.debug("import AmazonAdsAPI/Auth/AccessTokenFromRefreshToken");

const instance = new manager();

_.set(root, ["AmazonAdsAPI", "Auth", "AccessTokenFromRefreshToken"], instance);

export default instance;