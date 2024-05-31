export default class ErrorFormatter {
  /**
   * @param {Array} errors
   * @param {Object} schema
   * @returns {Array}
   */
  static make(errors, schema) {
    const errorMessages = [];

    for (const error of errors) {
      const errorFieldName = Object.values(error.params)[0];

      if (schema.properties[errorFieldName]) {
        const fieldTitle = schema.properties[errorFieldName].title;

        error.message = this.ucfirst(error.message.replace(errorFieldName, `"${fieldTitle}"`));
      }
      errorMessages.push(error);
    }

    return errorMessages;
  }

  /**
   * @param {string} string
   * @returns {string}
   */
  static ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
