import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class TransmissionResource extends Resource {
  static async get() {
    const result = await Api.get('/autocatalogs/transmissions');

    return TransmissionResource.map(result.body || []);
  }
}
