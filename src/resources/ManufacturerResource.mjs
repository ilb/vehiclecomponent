import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ManufacturerResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<ManufacturerResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(`${autocatalogsUrl}/manufacturers`, filters);

    return ManufacturerResource.map(result.body || []);
  }
}
