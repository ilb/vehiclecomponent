import Resource from './Resource.mjs';

export default class ManufacturerResource extends Resource {
  static async get() {
    const rows = [
      { id: 329192, name: 'AC', code: 'ac', avitoCode: 'ac' },
      { id: 329193, name: 'Acura', code: 'acura', avitoCode: 'acura' }
    ]

    return ManufacturerResource.map(rows);
  }
}