import createManager from "./Create/manager.js"
import createSchema from "./Create/schema.js"
// import updateManager from "./Create/manager.js"
// import updateSchema from "./Delete/schema.js"
// import deleteManager from "./Create/manager.js"
// import deleteSchema from "./Delete/schema.js"
import { _, logger } from "../../Common/systemCommon.js";

import Ajv from 'ajv'

export default function factoryMethod(filename, json)
{
    const ajv = new Ajv();

    if (ajv.validate(createSchema, json)) {
        logger.info("Valid CREATE: " + filename);
        return createManager;
    }
    /*
    else if (ajv.validate(update_schema, json)) {
        console.log("Valid UPDATE: " + filename);
        return new updateManager();
    }
    else if (ajv.validate(delete_schema, json)) {
        console.log("Valid DELETE: " + filename);
        return new deleteManager();
    }
    */
    else {
        logger.warn("Invalid: " + filename);
        return;
    }
}




