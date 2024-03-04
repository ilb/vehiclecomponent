import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class ManufacturerResource extends Resource {
  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/manufacturers` : "/autocatalogs/manufacturers",
      filters,
    );

    return ManufacturerResource.map(result.body || []);
  }
}
