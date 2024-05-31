/* eslint-disable no-unused-vars, iconicompany/avoid-naming -- Отключаем eslint no-unused-vars и iconicompany/avoid-naming */
export default class Resource {
  path = "";

  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<Resource[]>}
   */
  static async get(filters, autocatalogsUrl) {}

  /**
   * @param {Object[]} rows
   * @returns {Object[]}
   */
  static map(rows) {
    return rows.map(row => {
      const { id, name, code, ...overData } = row;

      return {
        id,
        key: id,
        label: name,
        text: name,
        value: code,
        data: overData,
      };
    });
  }
}
/* eslint-enable no-unused-vars, iconicompany/avoid-naming -- Возвращаем eslint no-unused-vars и iconicompany/avoid-naming */
