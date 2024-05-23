import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class TransmissionResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<TransmissionResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/transmissions` : "/autocatalogs/transmissions",
    );

    return TransmissionResource.map(result.body || []);
  }
}
