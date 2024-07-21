import { _, logger } from "../../../Common/common.js";
import { DocumentReference } from "firebase-admin/firestore";
import fireStoreManager from "../../manager.js"
import { create } from "./create.js"
/**
 * エラー時処理(システムエラー)
 * @param {string} job 
 * @param {string} mode
 * @param {string} error 
 * @param {DocumentReference} doc 
 */
export async function onSystemError(job, mode, error, doc) {
    if (error.logged) return;
    if (mode.includes("WRITE")) {
        logger.error(`[システムエラー発生][エラー内容表示]`, error);
    }
    if (mode.includes("SAVE")) {
        const ref = await fireStoreManager.createRef("L_Error");
        await fireStoreManager.setRef(ref, create(job, error, doc));
    }
    error.logged = true;
}

/**
 * エラー時処理(リクエストエラー)
 * @param {string} job 
 * @param {string} mode
 * @param {string} error 
 * @param {*} doc 
 */
export async function onRequestError(job, mode, error, doc) {
    if (error.logged) return;
    if (mode.includes("WRITE")) {
        logger.error(`[リクエストエラー発生][エラー内容表示]`, error);
    }
    if (mode.includes("SAVE")) {
        const ref = await fireStoreManager.createRef("L_Error");
        await fireStoreManager.setRef(ref, create(job, error, doc));
    }
    error.logged = true;
}

/**
 * エラー時処理(GCPエラー)
 * @param {string} job 
 * @param {string} mode
 * @param {string} error 
 * @param {*} doc 
 */
export async function onGCPError(job, mode, error, doc) {
    if (error.logged) return;
    if (mode.includes("WRITE")) {
        logger.error(`[GCPエラー発生][エラー内容表示]`, error);
    }
    if (mode.includes("SAVE")) {
        const ref = await fireStoreManager.createRef("L_Error");
        await fireStoreManager.setRef(ref, create(job, error, doc));
    }
    error.logged = true;
}

/**
 * エラー時処理(FireStoreエラー)
 * @param {string} job 
 * @param {string} mode
 * @param {string} error 
 * @param {*} doc 
 */
export async function onFireStoreError(job, mode, error, doc) {
    if (error.logged) return;
    if (mode.includes("WRITE")) {
        logger.error(`[FireStoreエラー発生][エラー内容表示]`, error);
    }
    if (mode.includes("SAVE")) {
        try {
            const ref = await fireStoreManager.createRef("L_Error");
            // FireStoreエラーの時はキャッチなし
            //await ref.set(create(job, error, doc));
            await fireStoreManager.setRef(ref, create(job, error, doc));
        } catch (e) {
            // FireStoreのエラー時は握りつぶす
        }
    }
    error.logged = true;
}