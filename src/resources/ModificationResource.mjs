import Api from "../Api.js";
import Resource from "./Resource.mjs";
/* eslint-disable no-unused-vars -- Отключаем eslint no-unused-vars */

export default class ModificationResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} filters.modelName
   * @param {string} filters.bodyName
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModificationResource[]>}
   */
  static async get({ modelName, bodyName, ...filters }, autocatalogsUrl) {
    if (filters.modelCode || filters.modelId || modelName) {
      const result = await Api.get(
        autocatalogsUrl ? `${autocatalogsUrl}/modifications` : "/autocatalogs/modifications",
        {
          withTransmission: true,
          ...filters,
        },
      );

      return ModificationResource.map(result.body || []);
    }
    return [];
  }
}
/* eslint-enable no-unused-vars -- Возвращаем eslint no-unused-vars */
