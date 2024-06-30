import fs from "fs";
import { isDebug } from "../Common/systemCommon.js";

const file = "./Dockerfile";

//const fd = fs.openSync( file, "w");

console.log(process.argv);

let text;

const reporReceive = isDebug ?
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/Main/reportReceive.js"]`
:
`FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "./src/Main/reportReceive.js", "-release" ]`
;


switch(process.argv[2])
{
    case "-reportReceive":{
        text = reporReceive;
        break;
    }
}

fs.writeFileSync( file , text);