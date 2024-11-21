import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModificationResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModificationResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const { manufacturerCode, modelCode, year } = filters;

    if (manufacturerCode && modelCode) {
      const result = await Api.get(`${autocatalogsUrl}/modifications`, {
        withTransmission: true,
        manufacturerCode,
        modelCode,
        ...(year && { year }),
      });

      return ModificationResource.map(result.body || []);
    }
    return [];
  }
}
