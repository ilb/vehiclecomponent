import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ModificationResource extends Resource {
  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {
    if (!filters.modelName || !filters.modelId) {
      return [];
    }
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/modifications` : "/autocatalogs/modifications",
      {
        withTransmission: true,
        ...filters,
      },
    );
    return ModificationResource.map(result.body || []);
  }
}
