import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword("uniforms");

ajv.addFormat(
  "email",
  /(^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$)|(^$)/,
);

ajv.addKeyword("isNotEmpty", {
  type: "string",
  errors: true,
  /**
   * @param schema
   * @param data
   * @param parent
   * @param key
   */
  validate: function validate(schema, data, parent, key) {
    validate.errors = [
      {
        keyword: "isNotEmpty",
        message: `должно иметь обязательное поле ${key}`,
        params: { keyword: "isNotEmpty" },
      },
    ];

    return typeof data === "string" && data.trim() !== "";
  },
});

export default ajv;
