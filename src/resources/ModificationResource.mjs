import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModificationResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/api/modifications` : '/autocatalogs/modifications', filters);

    return ModificationResource.map(result.body || []);
  }
}
