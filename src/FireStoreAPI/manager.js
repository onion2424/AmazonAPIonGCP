import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Transaction, Timestamp, Query} from 'firebase-admin/firestore';
import { createDoc } from './createDoc.js';
import { createBatch } from './createBatch.js'
import { getDocs, getQuery } from './getDocs.js'
import { countDocs } from './countDocs.js'
import { transaction } from './transaction.js';
import root from '../root.js';
import { _, systemInfo } from '../Common/systemCommon.js';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-firebase-adminsdk-semvr-dfdb5719d0.json';

const firebaseApp = initializeApp({ credential: cert(keyFilename) });
const db = getFirestore(firebaseApp, systemInfo.isTest() ? "test" : "(default)");
//const db = getFirestore(firebaseApp, "test");

export class manager {
    constructor() {

    }

    /**
     * 空のドキュメントを作成します。
     * @param {string} collectionName 
     * @returns 
     */
    async createDoc(collectionName) {
        return createDoc(db, collectionName);
    }

    /**
     * バッチを作成します。
     * @returns 
     */
    async createBatch() {
        return createBatch(db);
    }

    /**
     * ドキュメントを取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @param {number} limit
     * @returns 
     */
    async getDocs(collectionName, queries, limit) {
        return getDocs(db, collectionName, queries, limit)
    }

    /**
     * クエリを取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @param {number} limit
     * @returns 
     */
    async getQuery(collectionName, queries, limit) {
        return getQuery(db, collectionName, queries, limit)
    }

    /**
     * ドキュメントの数を取得します。
     * @param {string} collectionName
     * @param {[any[]]} queries 
     * @returns 
     */
    async countDocs(collectionName, queries) {
        this.countDocs(db, collectionName, queries)
    }

    /**
     * トランザクション処理を実行します。
     * @param {[(transaction: Transaction, obj: any) => Promise<void>]} functions 
     */
    async transaction(functions)
    {
        transaction(db, functions);
    }
}

const instance = new manager();
_.set(root, ["FireStoreAPI"], instance);

export default instance;