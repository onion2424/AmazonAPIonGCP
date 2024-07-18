import root from "../../root.js"
import { _, logger } from "../../Common/common.js";
import { DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";
import fireStoreManager from "../manager.js"

export class manager
{
    constructor(){
      
    }

    async caching()
    {
        let ret = [];
        for(const table in this){
            if('caching' in this[table])
                ret.push(await this[table].caching());
        }
        await Promise.all(ret);
    }

    /**
     * 
     * @param {DocumentSnapshot} ref 
     */
    async get(ref)
    {
        const [collection, documentId] = ref.path.split("/");
        const manager = _.get(this, [collection]);
        const cache = manager.cache;
        /**
         * @type {DocumentSnapshot}
         */
        let ret = cache.find(c => c.id == documentId);
        if(!ret && !manager.cached){
            // 並列実行は考えない(並列で実行するアプリはキャッシュさせる。)
            ret = (await fireStoreManager.getDocs(collection, [["documentId", "==", documentId]]))[0];
            cache.push(ret);
        }

        if(!ret) throw new Error("マスタ不整合");
        
        return ret;
    }
}

logger.debug("import FireStoreAPI/Collection");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection"], instance);

export default instance;