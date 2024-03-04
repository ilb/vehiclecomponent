import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModelResource extends Resource {
  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/models` : "/autocatalogs/models",
      filters,
    );

    return ModelResource.map(result.body || []);
  }
}
