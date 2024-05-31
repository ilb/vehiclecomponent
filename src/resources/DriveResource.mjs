import Api from "../Api.js";
import Resource from "./Resource.mjs";

export default class DriveResource extends Resource {
  /**
   * @param {Object} filters
   * @param {string} autocatalogsUrl
   * @returns {Promise<DriveResource[]>}
   */
  static async get(filters, autocatalogsUrl) {
    const result = await Api.get(
      autocatalogsUrl ? `${autocatalogsUrl}/drives` : "/autocatalogs/drives",
    );

    return DriveResource.map(result.body || []);
  }
}
