import fs from "fs";
import { systemInfo, utils } from "../../Common/common.js";
import fireStoreManager from "../../FireStoreAPI/manager.js"
import { S_RunningState } from "../../FireStoreAPI/Collection/S_RunningState/manager.js";

const file = "./Dockerfile";

const text = systemInfo.isTest() ?
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/BatchReceiver/index.js"]`
:
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/EntryPoint/BatchReceiver/index.js", "-release" ]`
;

fs.writeFileSync(file , text);