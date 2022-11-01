import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModificationResource extends Resource {
  static async get(filters) {
    const params = {
      ...filters,
      withBody: true,
      withTransmission: true
    }

    const result = await Api.get('http://127.0.0.1:3000/autocatalogs/api/modifications', params);

    return ModificationResource.map(result.body || []);
  }
}
