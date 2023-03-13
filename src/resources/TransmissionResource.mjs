import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class TransmissionResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(autocatalogsUrl ? `${autocatalogsUrl}/api/transmissions` : '/autocatalogs/transmissions');

    return TransmissionResource.map(result.body || []);
  }
}
