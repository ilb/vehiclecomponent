import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class BodyResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/bodies` : '/autocatalogs/bodies');

    return BodyResource.map(result.body || []);
  }
}