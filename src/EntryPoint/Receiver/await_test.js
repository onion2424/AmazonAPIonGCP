import { utils } from "../../Common/common.js";

async function main(){
    let obj = { name:"obj"};
    let obj2 = { name: "obj"};

    global.test = [obj, obj2];
    console.log(global.test);
    const tasks = [];
    const syncObj = { abort: false };
    for (const host of [1, 2]) {
        tasks.push(runAsync(host, obj));
        utils.wait(100);
    }
    await Promise.allSettled(tasks);
}

async function runAsync(host, obj){
    let obj2 = { name: "update" + host};
    console.log(`[wait][host=${host}]`);
    await utils.wait(3);
    const idx = global.test.indexOf(obj);
    console.log(idx);
    global.test[idx] = obj2;
}
await main();

console.log(global.test);
process.exit();