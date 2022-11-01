import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class BodyResource extends Resource {
  static async get() {
    const result = await Api.get('http://127.0.0.1:3000/autocatalogs/api/bodies');

    return BodyResource.map(result.body || []);
  }
}