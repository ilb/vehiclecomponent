import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModificationResource extends Resource {
  static async get(filters) {
    const result = await Api.get('/autocatalogs/modifications', filters);

    return ModificationResource.map(result.body || []);
  }
}
