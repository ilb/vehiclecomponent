export default class Resource {
  path = ''

  static async get() {

  }

  static map(rows) {
    return rows.map(row => {
      const { id, name, ...data } = row;
      return {
        id,
        key: id,
        value: name,
        text: name,
        data,
      };
    })
  }
}