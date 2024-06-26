import { managerBase } from "../managerBase.js";
import { create } from "./create.js";
import { status } from "./status.js";
import { download } from "./download.js";

const manager = new managerBase(create, status, download);

export default manager;