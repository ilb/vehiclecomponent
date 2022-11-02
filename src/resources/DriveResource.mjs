import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class DriveResource extends Resource {
  static async get() {
    const result = await Api.get('/autocatalogs/drives');

    return DriveResource.map(result.body || []);
  }
}
