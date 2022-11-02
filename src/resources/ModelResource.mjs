import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModelResource extends Resource {
  static async get(filters) {
    const result = await Api.get('/autocatalogs/models', filters);

    return ModelResource.map(result.body || []);
  }
}
