/* eslint-disable no-param-reassign, no-undefined, no-unused-vars -- Отключаем eslint no-param-reassign, no-undefined, no-unused-vars */
import fetch from "cross-fetch";

export default class Api {
  /**
   * get-запрос
   * @param {string} url
   * @param {Object} fetchData
   * @returns {Promise<*>}
   */
  static async get(url, fetchData = {}) {
    return this.execute(url, "GET", fetchData);
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} fetchData
   * @returns {Promise<*>}
   */
  static async execute(url, method, fetchData) {
    this.prepareData(fetchData);
    const link = this.prepareUrl(url, method, fetchData);
    const params = this.prepareParams(link, method, fetchData);
    const response = await fetch(link, params);

    return this.handleResponse(response);
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} fetchData
   * @returns {string}
   */
  static prepareUrl(url, method, fetchData) {
    if (!this.isValidHttpUrl(url)) {
      // если часть урлы, то к ней добавляется API_PATH, елси полная то используется как есть
      url = process.env.API_PATH + url;
    }

    if (method === "GET" && fetchData) {
      url = `${url}?${new URLSearchParams(fetchData).toString()}`;
    }

    return url;
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} fetchData
   * @returns {Object}
   */
  static prepareParams(url, method, fetchData) {
    const params = { method };

    if (method !== "GET" && fetchData) {
      params.body = JSON.stringify(fetchData);
    }

    return params;
  }

  /**
   * @param {Response} res
   * @returns {Promise<{ok: boolean, body: string}>}
   */
  static async handleResponse(res) {
    let body;

    if (res.headers.get("Content-Type")?.includes("application/json")) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    return { ok: res.ok, body };
  }

  /**
   * @param {string} string
   * @returns {boolean}
   */
  static async isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  /**
   * @param {Object} fetchData
   * @returns {Object}
   */
  static prepareData(fetchData) {
    for (const key in fetchData) {
      if ([null, undefined, ""].includes(fetchData[key])) {
        delete fetchData[key];
      }
    }

    return null;
  }
}
/* eslint-enable no-param-reassign, no-undefined, no-unused-vars -- Возвращаем eslint no-param-reassign, no-undefined, no-unused-vars */
