import Resource from './Resource.mjs';

export default class TransmissionResource extends Resource {
  static async get() {
    const rows = [
      { id: 331233, name: 'купе', code: 'COUPE', avitoCode: 'COUPE' },
      {
        id: 331232,
        name: 'кабриолет',
        code: 'CABRIOLET',
        avitoCode: 'CABRIOLET'
      },
      { id: 331231, name: 'внедорожник', code: 'SUV', avitoCode: 'SUV' },
      { id: 331237, name: 'седан', code: 'SEDAN', avitoCode: 'SEDAN' },
      {
        id: 331240,
        name: 'хетчбэк',
        code: 'HATCHBACK',
        avitoCode: 'HATCHBACK'
      },
      {
        id: 331238,
        name: 'универсал',
        code: 'ESTATECAR',
        avitoCode: 'ESTATECAR'
      }
    ];

    return TransmissionResource.map(rows);
  }
}
