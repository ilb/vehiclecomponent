import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModelResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/api/models` : '/autocatalogs/models', filters);

    return ModelResource.map(result.body || []);
  }
}
