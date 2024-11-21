import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModelResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModelResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(`${autocatalogsUrl}/models`, filters);

    return ModelResource.map(result.body || []);
  }
}
