/* eslint-disable n/no-extraneous-import -- Отключаем eslint n/no-missing-import и n/no-extraneous-import */
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword("uniforms");

ajv.addFormat(
  "email",
  /(^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$)|(^$)/u,
);

ajv.addKeyword("isNotEmpty", {
  type: "string",
  errors: true,
  /**
   * @param {Object} schema
   * @param {string} validateData
   * @param {Object} parent
   * @param {string} key
   * @returns {boolean}
   */
  validate: function validate(schema, validateData, parent, key) {
    validate.errors = [
      {
        keyword: "isNotEmpty",
        message: `должно иметь обязательное поле ${key}`,
        params: { keyword: "isNotEmpty" },
      },
    ];

    return typeof validateData === "string" && validateData.trim() !== "";
  },
});

export default ajv;
/* eslint-enable n/no-extraneous-import -- Возвращаем eslint n/no-missing-import и n/no-extraneous-import */
