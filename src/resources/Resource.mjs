export default class Resource {
  path = ''

  static async get() {

  }

  static map(rows) {
    return rows.map(row => ({ value: row.name, key: row.id, label: row.name }))
  }
}