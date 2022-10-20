import Resource from './Resource.mjs';

export default class SteerLocationResource extends Resource {
  static async get() {
    const rows = [
      { id: 1, name: 'Слева' },
      { id: 2, name: 'Справа' },
    ];

    return SteerLocationResource.map(rows);
  }
}
