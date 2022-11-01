import Resource from './Resource.mjs';
import Api from '../Api.js';

export default class TransmissionResource extends Resource {
  static async get() {
    const result = await Api.get('http://127.0.0.1:3000/autocatalogs/api/transmissions');

    return TransmissionResource.map(result.body || []);
  }
}
