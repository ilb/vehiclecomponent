import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class BodyResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<BodyResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(`${autocatalogsUrl}/bodies`);

    return BodyResource.map(result.body || []);
  }
}
