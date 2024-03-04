import fetch from "cross-fetch";

export default class Api {
  /**
   * get-запрос
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async get(url, data = {}) {
    return this.execute(url, "GET", data);
  }

  /**
   * @param url
   * @param method
   * @param data
   */
  static async execute(url, method, data) {
    this.prepareData(data);
    const link = this.prepareUrl(url, method, data);
    const params = this.prepareParams(link, method, data);
    const response = await fetch(link, params);

    return this.handleResponse(response);
  }

  /**
   * @param url
   * @param method
   * @param data
   */
  static prepareUrl(url, method, data) {
    if (!this.isValidHttpUrl(url)) {
      // если часть урлы, то к ней добавляется API_PATH, елси полная то используется как есть
      url = process.env.API_PATH + url;
    }

    if (method === "GET") {
      url = `${url}?${new URLSearchParams(data).toString()}`;
    }

    return url;
  }

  /**
   * @param url
   * @param method
   * @param data
   */
  static prepareParams(url, method, data) {
    const params = { method };

    if (method !== "GET") {
      params.body = JSON.stringify(data);
    }

    return params;
  }

  /**
   * @param res
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
   * @param string
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
   * @param {any} data
   */
  static prepareData(data) {
    for (const key in data) {
      if ([null, undefined].includes(data[key])) {
        delete data[key];
      }
    }
  }
}
