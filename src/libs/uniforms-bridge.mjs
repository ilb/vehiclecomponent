/* eslint-disable n/no-missing-import -- Отключаем eslint n/no-missing-import */
import localize from "ajv-i18n";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

import ajv from "./ajv";
import ErrorFormatter from "./ErrorFormatter";

/**
 * @param {Object} schema
 * @param {Function} additionalValidator
 * @returns {Function}
 */
const createValidator = (schema, additionalValidator) => {
  const validator = ajv.compile(schema);

  return model => {
    let errors = [];

    validator(model);

    if (validator.errors && validator.errors.length) {
      errors = validator.errors;
    }

    if (additionalValidator) {
      errors = errors.concat(additionalValidator(model));
    }

    if (errors.length) {
      localize.ru(errors);
      return { details: ErrorFormatter.make(errors, schema) };
    }

    return null;
  };
};

/**
 * @param {Object} schema
 * @param {Function} additionalValidator
 * @returns {JSONSchemaBridge}
 */
const createSchemaBridge = (schema, additionalValidator) => {
  const schemaValidator = createValidator(schema, additionalValidator);

  return new JSONSchemaBridge(schema, schemaValidator);
};

export default createSchemaBridge;
/* eslint-enable n/no-missing-import -- Возвращаем eslint n/no-missing-import */
