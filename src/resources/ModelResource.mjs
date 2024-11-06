import Api from "../Api.js";
import Resource from "./Resource.mjs";
/* eslint-disable no-unused-vars -- Отключаем eslint no-unused-vars */
export default class ModelResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} filters.manufacturerName
   * @param {string} autocatalogsUrl
   * @returns {Promise<ModelResource[]>}
   */
  static async get({ manufacturerName, ...filters }, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/models` : "/autocatalogs/models",
      filters,
    );

    return ModelResource.map(result.body || []);
  }
}
/* eslint-enable no-unused-vars -- Возвращаем eslint no-unused-vars */
