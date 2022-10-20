import Resource from './Resource.mjs';

export default class ModelResource extends Resource {
  static async get(filters) {
    const rows = [
      {
        id: 421756,
        name: '378 GT Zagato',
        code: '378_gt_zagato',
        avitoCode: '378_gt_zagato',
        vehicleManufacturerId: 329192
      },
      {
        id: 329595,
        name: 'Ace',
        code: 'ace',
        avitoCode: 'ace',
        vehicleManufacturerId: 329192
      },
      {
        id: 329596,
        name: 'Aceca',
        code: 'aceca',
        avitoCode: 'aceca',
        vehicleManufacturerId: 329192
      },
      {
        id: 329852,
        name: 'Cobra',
        code: 'cobra',
        avitoCode: 'cobra',
        vehicleManufacturerId: 329192
      },
      {
        id: 331089,
        name: 'ZDX',
        code: 'zdx',
        avitoCode: 'zdx',
        vehicleManufacturerId: 329193
      },
      {
        id: 330645,
        name: 'RDX',
        code: 'rdx',
        avitoCode: 'rdx',
        vehicleManufacturerId: 329193
      },
      {
        id: 330238,
        name: 'Integra',
        code: 'integra',
        avitoCode: 'integra',
        vehicleManufacturerId: 329193
      },
    ]

    return ModelResource.map(rows);
  }
}
