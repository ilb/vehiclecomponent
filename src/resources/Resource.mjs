export default class Resource {
  path = ''

  static async get(filters, autocatalogsUrl) {

  }

  static map(rows) {
    return rows.map(row => {
      const { id, name, code, ...data } = row;
      return {
        id,
        key: id,
        label: name,
        value: code,
        data,
      };
    })
  }
}