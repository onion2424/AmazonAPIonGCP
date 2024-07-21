import root from "../../root.js"
import { _, logger } from "../../Common/common.js";
import { DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";
import fireStoreManager from "../manager.js"

export class manager
{
    constructor(){
      
    }

    /**
     * キャッシュします。
     */
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
     * リファレンスを受け取り、キャッシュまたはマスタを取得します。
     * @param {DocumentSnapshot} doc 
     */
    async get(doc){
        const [collection, documentId] = doc.path.split("/");
        const manager = _.get(this, [collection]);
        const cache = manager.cache;
        /**
         * @type {DocumentSnapshot}
         */
        let ret = cache.find(c => c.id == documentId);
        if(!ret && !manager.cached){
            // 並列実行は考えない - nodeはシングルスレッド
            ret = (await fireStoreManager.getDocs(collection, [["documentId", "==", documentId]]))[0];
            cache.push(ret);
        }

        if(!ret) throw new Error("マスタ不整合");
        
        return ret;
    }

    /**
     * リファレンスを受け取り、キャッシュしなおします。
     * @param {DocumentSnapshot} doc 
     * @returns {Promise<DocumentSnapshot>}
     */
    async recache(doc){
        // recacheを2つ並列で行うと - Receiver/await_test.jsで検証
        // 同時にawaitまでくることはあるけど、それ以降はやっぱりシングル処理
        const [collection, documentId] = doc.ref.path.split("/");
        const manager = _.get(this, [collection]);
        const idx = manager.cache.findIndex(c => c.ref.path == doc.ref.path); // ここで取得しておけば最悪上書きされるだけ。
        const newDoc = await doc.ref.get();
        manager.cache[idx] = newDoc;
        return newDoc;
    }
}

logger.debug("import FireStoreAPI/Collection");

const temp = _.get(root, ["FireStoreAPI", "Collection"]);

const instance = new manager();
if(temp){
    Object.assign(instance, temp);
}

_.set(root, ["FireStoreAPI", "Collection"], instance);


export default instance;