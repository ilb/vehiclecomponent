import Resource from './Resource.mjs';

export default class TransmissionResource extends Resource {
  static async get() {
    const rows = [
      {
        id: 331254,
        name: 'механика',
        code: 'MANUAL',
        avitoCode: 'MANUAL'
      },
      {
        id: 331255,
        name: 'автомат',
        code: 'AUTOMATIC',
        avitoCode: 'AUTOMATIC'
      },
      {
        id: 331256,
        name: 'робот',
        code: 'ROBOTIC',
        avitoCode: 'ROBOTIC'
      },
      {
        id: 331257,
        name: 'вариатор',
        code: 'VARIATOR',
        avitoCode: 'VARIATOR'
      }
    ];

    return TransmissionResource.map(rows);
  }
}
