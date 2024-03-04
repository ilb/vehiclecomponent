export default class Resource {
  path = "";

  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {}

  /**
   * @param rows
   */
  static map(rows) {
    return rows.map(row => {
      const { id, name, code, ...data } = row;

      return {
        id,
        key: id,
        label: name,
        text: name,
        value: code,
        data,
      };
    });
  }
}
