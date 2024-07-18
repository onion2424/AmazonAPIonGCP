import fs from "fs";
import { systemInfo } from "../../Common/common.js";

const file = "./testrunner.json";

//const fd = fs.openSync( file, "w");

const text = systemInfo.isTest() ?
`{ "mode": "TEST" }`
:
`{ "mode": "RELEASE"}`
;


fs.writeFileSync( file , text);