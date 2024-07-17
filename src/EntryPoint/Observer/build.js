import fs from "fs";
import { systemInfo } from "../../Common/systemCommon.js";

const file = "./Dockerfile";

//const fd = fs.openSync( file, "w");

const text = systemInfo.isTest() ?
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/Observer/index.js"]`
:
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/Observer/index.js", "-release"]`
;


fs.writeFileSync(file , text);