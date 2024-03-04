import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class DriveResource extends Resource {
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/drives` : '/autocatalogs/drives'
    );

    return DriveResource.map(result.body || []);
  }
}
