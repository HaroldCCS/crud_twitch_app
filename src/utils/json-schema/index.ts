import Ajv from "ajv"
const optionsAjv = {
    allErrors: true,
    strictTypes: false
};
const ajv = new Ajv(optionsAjv)

import schema_userRegister from "./users/userRegister.schema.json";
import schema_userUpdate from "./users//userUpdate.schema.json";
import schema_gameRegister from "./games/gameRegister.schema.json";
import schema_gameUpdate from "./games//gameUpdate.schema.json";

//register schemas
ajv.addSchema(schema_gameRegister, "schema_gameRegister");
ajv.addSchema(schema_gameUpdate, "schema_gameUpdate");
ajv.addSchema(schema_userRegister, "schema_userRegister");
ajv.addSchema(schema_userUpdate, "schema_userUpdate");

export default ajv;



/**
 * @param {object[]} errors Objects of the errors in validation
*/
export const parseSimpleErrors = function (errors : any) {
    return errors.map(({ message, params, dataPath, keyword,instancePath }: any) => {
        try {
            const property = instancePath.substring(1);
            if ('enum' === keyword) {
                return `${message} ${params.allowedValues} '${property}'`
            }
            if (params.hasOwnProperty("additionalProperty")) {
                return `${message} '${params.additionalProperty}'`
            }
            if (dataPath) {
                return `${message} '${property}'`;
            }
            if(message.includes(property)){
                return message ;
            }
            return `${message} '${property}'`;
        } catch (error) {
            return message;
        }
    })
}

export function processValidationBodyJsonSchema(body: Object, nameSchema: string) {
    const method = "processValidationBodyJsonSchema";
    const validateSchema: any = ajv.getSchema(nameSchema);
	if (!validateSchema(body)) {
        let response = {
            message: 'Please send a correct body request.',
            type: 'error'
        }
		const errors = parseSimpleErrors(validateSchema.errors);
		const messageError = `Error al realizar las validaciones [json-schema] : ${JSON.stringify(errors)}`;
        return {status: true, response: response, messageError: messageError, method: method}

	}
    return {status: false}
}