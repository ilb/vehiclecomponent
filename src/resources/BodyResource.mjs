import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class BodyResource extends Resource {
  static async get() {
    const result = await Api.get('/autocatalogs/bodies');

    return BodyResource.map(result.body || []);
  }
}