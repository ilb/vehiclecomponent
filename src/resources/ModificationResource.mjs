import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModificationResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModificationResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    if (filters.modelCode) {
      const result = await Api.get(`${autocatalogsUrl}/modifications`, {
        withTransmission: true,
        ...filters,
      });

      return ModificationResource.map(result.body || []);
    }
    return [];
  }
}
