import Resource from './Resource.mjs';

export default class ModificationResource extends Resource {
  static async get() {
    const rows = [
      {
        id: 421891,
        vehicleModelId: 421756,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331233,
        vehicleYear: 2012,
        vehicleEngineCapacity: 6.2,
        vehicleEnginePower: 442,
        name: '6.2 MT (442 л.с.)',
        code: 'MANUAL__442__6_2'
      },
      {
        id: 360354,
        vehicleModelId: 329595,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331232,
        vehicleYear: 1992,
        vehicleEngineCapacity: 3,
        vehicleEnginePower: 223,
        name: '3.0 MT (223 л.с.)',
        code: 'MANUAL__223__3_0'
      },

      {
        id: 361944,
        vehicleModelId: 329595,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331232,
        vehicleYear: 1992,
        vehicleEngineCapacity: 3.5,
        vehicleEnginePower: 354,
        name: '3.5 MT (354 л.с.)',
        code: 'MANUAL__354__3_5'
      },

      {
        id: 363436,
        vehicleModelId: 329595,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331232,
        vehicleYear: 1992,
        vehicleEngineCapacity: 4.6,
        vehicleEnginePower: 326,
        name: '4.6 MT (326 л.с.)',
        code: 'MANUAL__326__4_6'
      },

      {
        id: 363631,
        vehicleModelId: 329595,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331232,
        vehicleYear: 1992,
        vehicleEngineCapacity: 4.9,
        vehicleEnginePower: 260,
        name: '4.9 MT (260 л.с.)',
        code: 'MANUAL__260__4_9'
      },

      {
        id: 359296,
        vehicleModelId: 329595,
        vehicleTransmissionId: 331254,
        vehicleBodyId: 331232,
        vehicleYear: 1992,
        vehicleEngineCapacity: 2.9,
        vehicleEnginePower: 195,
        name: '2.9 MT (195 л.с.)',
        code: 'MANUAL__195__2_9'
      },
    ]

    return ModificationResource.map(rows);
  }
}
