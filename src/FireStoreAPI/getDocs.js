import { Firestore, FieldPath, Filter, Query } from "firebase-admin/firestore";

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[any]} queries 
 * @param {[order]} orderbyInfo
 * @param {number} limit
 * @returns {[FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>]}
 */
export async function getDocs(db, collectionName, queries, orderbyInfo,  limit) {
    /*
    let collectionRef = db.collection(collectionName);

    const ret = [];

    if (queries)
        queries.forEach(query => {
            if (query[0] == "documentId") {
                query[0] = FieldPath.documentId();
            }
            collectionRef = collectionRef.where(...query);
        });

    if (limit) {
        collectionRef = collectionRef.limit(limit);
    }

    const snapshot = await collectionRef.get();
    console.log("doc get start");
    for await (let doc of snapshot.docs) {
        const data = doc.data();
        // documentIdを追加
        data.documentId = doc.id;
        ret.push(data);
        console.log("doc push " + data.documentId);
    }
    console.log("doc get end");

    return ret;
    */
    return getDocs_step(db, collectionName, queries, orderbyInfo, limit, true);
};

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[any]} queries 
 * @param {[order]} orderbyInfo
 * @param {number} limit
 * @returns {FirebaseFirestore.Query<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>}
 */
export async function getQuery(db, collectionName, queries, orderbyInfo, limit) {
    return getDocs_step(db, collectionName, queries, orderbyInfo, limit, false);
};

/**
 * 
 * @param {Firestore} db 
 * @param {string} collectionName 
 * @param {[any]} queries 
 * @param {[order]} orderbyInfo
 * @param {number} limit
 * @param {boolean} get データをゲットするかどうか。
 * @returns {any}
 */
export async function getDocs_step(db, collectionName, queries, orderbyInfo, limit, get) {
    let collectionRef = db.collection(collectionName);

    /**
     * @type {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>|Query<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>}
     */
    let ref = collectionRef;

    if (queries) {
        const params = createQuery(queries);
        params.forEach(param => ref = ref.where(param));
    }

    if(orderbyInfo){
        orderbyInfo.forEach(order => ref = ref.orderBy(order.column, order.direction));
    }

    if (limit) {
        ref = ref.limit(limit);
    }

    if (get) {
        let ret = [];
        const snapshot = await ref.get();
        for await (let doc of snapshot.docs) {
            //const data = doc.data();
            // documentIdを追加
            //data.documentId = doc.id;
            ret.push(doc);
        }
        return ret;
    }
    else
        return ref;
};

/**
 * 
 * @param {*} queries 
 * @returns 
 */
function createQuery(queries) {
    /**
     * @type {Filter}
     */
    let ret = [];

    const [first, ...others] = queries;

    // or/andの場合はクエリを合成する
    if (first == "or" || first == "and") {
        ret.push(Filter[first](...createQuery(others)));
        return ret;
    }
    else 
    {
        queries.forEach(query => {
            if (query[0] == "documentId") {
                query[0] = FieldPath.documentId();
            }
            ret.push(Filter.where(...query));
        });
        return ret;
    }
}