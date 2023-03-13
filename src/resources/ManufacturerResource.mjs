import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ManufacturerResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/api/manufacturers` : '/autocatalogs/manufacturers', filters);

    return ManufacturerResource.map(result.body || []);
  }
}