import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class TransmissionResource extends Resource {
  /**
   * @param filters
   * @param autocatalogsUrl
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/transmissions` : "/autocatalogs/transmissions",
    );

    return TransmissionResource.map(result.body || []);
  }
}
