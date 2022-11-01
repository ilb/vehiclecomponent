import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModelResource extends Resource {
  static async get(filters) {
    const result = await Api.get('http://127.0.0.1:3000/autocatalogs/api/models', filters);

    return ModelResource.map(result.body || []);
  }
}
