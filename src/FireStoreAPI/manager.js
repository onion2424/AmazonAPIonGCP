import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Transaction, Timestamp } from 'firebase-admin/firestore';
import { createDoc } from './createDoc.js';
import { createBatch } from './createBatch.js'
import { getDocs } from './getDocs.js'
import root from '../root.js';
import { _ } from '../Common/systemCommon.js';

const keyFilename = './AmazonApiServiceKey/amazon-api-report-firebase-adminsdk-semvr-dfdb5719d0.json';

const firebaseApp = initializeApp({credential: cert(keyFilename)});
const db = getFirestore(firebaseApp, "(default)");

export class manager
{
    constructor()
    {
    }

    /**
     * 空のドキュメントを作成します。
     * @param {string} collectionName 
     * @returns 
     */
    async createDoc(collectionName)
    {
        return createDoc(db, collectionName);
    }

    /**
     * バッチを作成します。
     * @returns 
     */
    async createBatch()
    {
        return createBatch(db);
    }

    /**
     * 
     * @param {string} collectionName
     * @param {[string[]]} queries 
     * @returns 
     */
    async getDocs(collectionName, queries)
    {
        return getDocs(db, collectionName, queries)
    }
} 

const test = new manager();
_.set(root, ["FireStoreAPI"], test);

export default test;