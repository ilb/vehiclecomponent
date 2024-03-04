import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class BodyResource extends Resource {
  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/bodies` : "/autocatalogs/bodies",
    );

    return BodyResource.map(result.body || []);
  }
}
