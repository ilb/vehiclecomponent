import fetch from 'isomorphic-fetch';

export default class Api {
  /**
   * get-запрос
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async get(url, data = {}) {
    return this.execute(url, 'GET', data);
  }

  static async execute(url, method, data) {
    const link = this.prepareUrl(url, method, data);
    const params = this.prepareParams(link, method, data);
    const response = await fetch(link, params);

    return this.handleResponse(response);
  }

  static prepareUrl(url, method, data) {
    url = process.env.API_PATH + url;

    if (method === 'GET') {
      url = `${url}?${new URLSearchParams(data).toString()}`;
    }

    return url;
  }

  static prepareParams(url, method, data) {
    const params = { method };

    if (method !== 'GET') {
      params.body = JSON.stringify(data);
    }

    return params;
  }

  static async handleResponse(res) {
    let body;

    if (res.headers.get('Content-Type')?.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    return { ok: res.ok, body };
  }
}
