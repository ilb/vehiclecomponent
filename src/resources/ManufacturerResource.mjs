import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class ManufacturerResource extends Resource {
  static async get() {
    const result = await Api.get('/autocatalogs/manufacturers');

    return ManufacturerResource.map(result.body || []);
  }
}