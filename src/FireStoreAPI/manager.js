import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Transaction, Timestamp, Query } from 'firebase-admin/firestore';
import { createRef, setRef, updateRef, deleteRef } from './createRef.js';
import { createBatch, commitBatch } from './createBatch.js'
import { getDocs, getQuery } from './getDocs.js'
import { deleteDocs } from './deleteDocs.js';
import { transaction } from './transaction.js';
import { countDocs } from "./countDocs.js"
import root from '../root.js';
import { _, systemInfo, logger } from '../Common/common.js';
//import { subscribe } from './subscribe.js';
import { recursiveDelete } from './recursiveDelete.js';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-firebase-adminsdk-semvr-dfdb5719d0.json';

const firebaseApp = initializeApp({ credential: cert(keyFilename) });
const db = getFirestore(firebaseApp, systemInfo.isTest() ? "test" : "(default)");

export class manager {
    constructor() {
    }

    /**
     * 空のドキュメントリファレンスを作成します。
     * @param {string} collectionName 
     * @returns 
     */
    createRef(collectionName) {
        return createRef(db, collectionName);
    }

    /**
     * セットを実行します。
     * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
     * @param {*} data
     */
    async setRef(ref, data) {
        return setRef(ref, data);
    }

    /**
     * アップデートを実行します。
     * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
     * @param {*} data
     */
    async updateRef(ref, data) {
        return updateRef(ref, data);
    }

    /**
     * 削除を実行します。
     * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>} ref 
     */
    async deleteRef(ref) {
        return deleteRef(ref);
    }

    /**
     * バッチを作成します。
     * @returns 
     */
    async createBatch() {
        return createBatch(db);
    }

    /**
     * バッチを作成します。
     * @param {FirebaseFirestore.WriteBatch} batch 
     * @returns 
     */
    async commitBatch(batch) {
        return commitBatch(batch);
    }

    /**
     * ドキュメントを取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @param {[order]} orderbyInfo
     * @param {number} limit
     * @returns 
     */
    async getDocs(collectionName, queries, orderbyInfo, limit) {
        return getDocs(db, collectionName, queries, orderbyInfo, limit)
    }

    /**
     * クエリを取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @param {[order]} orderbyInfo
     * @param {number} limit
     * @returns 
     */
    async getQuery(collectionName, queries, orderbyInfo, limit) {
        return getQuery(db, collectionName, queries, orderbyInfo, limit)
    }

    /**
     * チャンク分割して削除します。
     * @param {[FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>]} docs 
     * @returns 
     */
    async deleteDocs(docs){
        return deleteDocs(docs);
    }

    /**
     * ドキュメントの数を取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @returns 
     */
    async countDocs(collectionName, queries) {
        return countDocs(db, collectionName, queries);
    }

    /**
     * ドキュメントの数を取得します。
     * @param {string} collectionName
     * @returns 
     */
    async recursiveDelete(collectionName){
        return recursiveDelete(db, collectionName);
    }

    /**
     * トランザクション処理を実行します。
     * @param {[(transaction: Transaction, obj: any) => Promise<void>]} getFunctions 
     * @param {[(transaction: Transaction, obj: any) => Promise<void>]} writeFunctions 
     */
    async transaction(getFunctions, writeFunctions) {
        return transaction(db, getFunctions, writeFunctions);
    }

    // /**
    //  * 購読します。
    //  * @param {string} collectionName 
    //  * @param {[any[]]} queries
    //  * @param {*} func 
    //  * @returns 
    //  */
    // async subscribe(collectionName, queries, func) {
    //     return subscribe(db, collectionName, queries, func);
    // }
}

logger.debug("import FireStoreAPI");
const temp = _.get(root, ["FireStoreAPI"]);

const instance = new manager();
if (temp) {
    Object.assign(instance, temp);
}

_.set(root, ["FireStoreAPI"], instance);


export default instance;