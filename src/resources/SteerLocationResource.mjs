import Resource from './Resource.mjs';

export default class SteerLocationResource extends Resource {
  static async get() {
    const rows = [
      { id: 1, name: 'Слева', code: 'LEFT' },
      { id: 2, name: 'Справа', code: 'RIGHT' }
    ];

    return SteerLocationResource.map(rows);
  }
}
