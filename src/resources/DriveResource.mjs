import Resource from './Resource.mjs';

export default class DriveResource extends Resource {
  static async get() {
    const rows = [
      { id: 331252, name: 'задний', code: 'rear', avitoCode: 'rear' },
      { id: 331253, name: 'полный', code: 'full', avitoCode: 'full' },
      { id: 331251, name: 'передний', code: 'front', avitoCode: 'front' }
    ]

    return DriveResource.map(rows);
  }
}
