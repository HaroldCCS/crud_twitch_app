"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processValidationBodyJsonSchema = exports.parseSimpleErrors = void 0;
const ajv_1 = __importDefault(require("ajv"));
const optionsAjv = {
    allErrors: true,
    strictTypes: false
};
const ajv = new ajv_1.default(optionsAjv);
const userRegister_schema_json_1 = __importDefault(require("./userRegister.schema.json"));
const userUpdate_schema_json_1 = __importDefault(require("./userUpdate.schema.json"));
//register schemas
ajv.addSchema(userRegister_schema_json_1.default, "schema_userRegister");
ajv.addSchema(userUpdate_schema_json_1.default, "schema_userUpdate");
exports.default = ajv;
/**
 * @param {object[]} errors Objects of the errors in validation
*/
const parseSimpleErrors = function (errors) {
    return errors.map(({ message, params, dataPath, keyword, instancePath }) => {
        try {
            const property = instancePath.substring(1);
            if ('enum' === keyword) {
                return `${message} ${params.allowedValues} '${property}'`;
            }
            if (params.hasOwnProperty("additionalProperty")) {
                return `${message} '${params.additionalProperty}'`;
            }
            if (dataPath) {
                return `${message} '${property}'`;
            }
            if (message.includes(property)) {
                return message;
            }
            return `${message} '${property}'`;
        }
        catch (error) {
            return message;
        }
    });
};
exports.parseSimpleErrors = parseSimpleErrors;
function processValidationBodyJsonSchema(body, nameSchema) {
    const method = "processValidationBodyJsonSchema";
    const validateSchema = ajv.getSchema(nameSchema);
    if (!validateSchema(body)) {
        let response = {
            message: 'Please send a correct body request.',
            type: 'error'
        };
        const errors = (0, exports.parseSimpleErrors)(validateSchema.errors);
        const messageError = `Error al realizar las validaciones [json-schema] : ${JSON.stringify(errors)}`;
        return { status: true, response: response, messageError: messageError, method: method };
    }
    return { status: false };
}
exports.processValidationBodyJsonSchema = processValidationBodyJsonSchema;
//# sourceMappingURL=index.js.map