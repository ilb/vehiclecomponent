import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModelResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModelResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const { manufacturerCode } = filters;

    if (manufacturerCode) {
      const result = await Api.get(`${autocatalogsUrl}/models`, { manufacturerCode });

      return ModelResource.map(result.body || []);
    }
    return [];
  }
}
