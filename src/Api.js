import fetch from "cross-fetch";

export default class Api {
  /**
   * get-запрос
   * @param {string} url
   * @param {object} data
   * @returns {Promise<*>}
   */
  static async get(url, data = {}) {
    return this.execute(url, "GET", data);
  }

  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {string} data
   * @return {Object}
   */
  static async execute(url, method, data) {
    const link = this.prepareUrl(url, method, data);
    const params = this.prepareParams(method, data);
    const response = await fetch(link, params);

    return this.handleResponse(response);
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {object} data
   * @returns {string}
   */
  static prepareUrl(url, method, data) {
    if (!this.isValidHttpUrl(url)) {
      // если часть урлы, то к ней добавляется API_PATH, елси полная то используется как есть
      url = process.env.API_PATH + url;
    }
    const searchParams = this.prepareData(data);
    if (method === "GET" && Object.keys(searchParams).length) {
      url = `${url}?${new URLSearchParams(searchParams).toString()}`;
    }

    return url;
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} data
   * @returns {Object}
   */
  static prepareParams(method, data) {
    const params = { method };

    if (method !== "GET" && data) {
      params.body = JSON.stringify(data);
    }

    return params;
  }

  /**
   * @param {Response} res
   * @returns {Object}
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
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  /**
   * Мутод фильтрует обьект параметров
   * @param {Object} searchParams
   * @returns {Object}
   */
  static prepareData(searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!key || !value) {
        delete searchParams[key];
      }
    });
    return searchParams;
  }
}
