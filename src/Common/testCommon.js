import { systemInfo } from './common.js'
import { readFile } from 'fs/promises';

export * from "node:test";
export * as assert from "node:assert";

const data = JSON.parse(await readFile("./testrunner.json"));

// テストは引数を取れないので、ここで上書きする
//systemInfo.mode = data.mode;