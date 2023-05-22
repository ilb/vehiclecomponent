import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ModificationResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/modifications` : '/autocatalogs/modifications', {
      withTransmission: true,
      ...filters
    });

    return ModificationResource.map(result.body || []);
  }
}
