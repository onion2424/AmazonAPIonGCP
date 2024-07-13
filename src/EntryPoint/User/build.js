import fs from "fs";
import { systemInfo } from "../../Common/systemCommon.js";

const file = "./Dockerfile";

//const fd = fs.openSync( file, "w");

console.log(process.argv);

const text = systemInfo.isTest() ?
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/User/index.js"]`
:
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/User/index.js", "-release"]`
;


fs.writeFileSync(file , text);