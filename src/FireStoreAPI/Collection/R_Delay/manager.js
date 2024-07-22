import root from "../../../root.js"
import { _, logger, dayjs } from "../../../Common/common.js";
import { R_Delay } from "./class.js";
export { R_Delay } from "./class.js";
import collectionManaer from "../manager.js"
import fireStoreManager from "../../../FireStoreAPI/manager.js"
import { create } from "./create.js";
import { DocumentSnapshot, Timestamp } from "firebase-admin/firestore";

export class manager {
  constructor() {
    this.create = create;
    /**
     * @type {[FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>]}
     */
    this.cache = [];
  }

  /**
   * ディレイを取得します。
   * @param {DocumentSnapshot} mtokenDoc
   */
  delay(mtokenDoc) {
    let find = this.cache.find(c => c.data().ref.id == mtokenDoc.ref.id);
    if (find) {
      /**
       * @type {R_Delay}
       */
      const rdelay = find.data();
      if (dayjs(rdelay.time.toDate()) > dayjs()) {
        return rdelay;
      }
    }
    return false;
  }

  /**
   * 購読します。
   */
  subscribe() {
    const self = this;
    const func = function (change) {
      // 追加時
      if (change.type === 'added') {
        let index = self.cache.findIndex(c => c.data().ref.id == change.doc.data().ref.id);
        if(index > 0){
          self.cache[index] = change.doc;
        }else{
          self.cache.push(change.doc);
        }
        //console.log(change.doc.data());
      }
      // 更新時
      if (change.type === 'modified') {
        //console.log(change.doc.data());
      }
      // 削除時
      if (change.type === 'removed') {
        //console.log(change.doc.data());
      }
    }
    fireStoreManager.subscribe("R_Delay", [["time", ">", Timestamp.fromDate(dayjs().toDate())]], func);
  }

  /**
   * 追加します。
   * @param {DocumentSnapshot} mtokenDoc
   */
  async add(mtokenDoc){
    const rdelay = this.create(mtokenDoc);
    const ref = await fireStoreManager.createRef("R_Delay");
    await fireStoreManager.setRef(ref, rdelay);
    return rdelay;
  }

  /**
   * クリアします。
   */
  async clear() {
    const docs = await fireStoreManager.getDocs("R_Delay");
    const batch = await fireStoreManager.createBatch();
    for (const doc of docs){
      batch.delete(doc.ref);
    }
    await fireStoreManager.commitBatch(batch);
  }
}

logger.debug("import FireStoreAPI/Collection/R_Delay");

const instance = new manager();

_.set(root, ["FireStoreAPI", "Collection", "R_Delay"], instance);

export default instance;