import * as pathImport from 'path';

export const mode = process.argv.some(arg => arg == "-release") ? "RELEASE" : "DEBUG";
export const isDebug = mode == "DEBUG";
export const combine = (...args) => pathImport.join(...args).replace(/(\\)/g,'/');