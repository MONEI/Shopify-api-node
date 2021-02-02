'use strict';

const qs = require('qs');

/**
 * This provides methods used by resources that have no relationships with
 * other resources. It's not meant to be used directly.
 *
 * @mixin
 */
const base = {
  /**
   * Counts the number of records.
   *
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  count(params) {
    const key = 'count';
    const url = this.buildUrl(key, params);
    return this.shopify.request(url, 'GET', key);
  },

  /**
   * Creates a new record.
   *
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(params) {
    const url = this.buildUrl();
    return this.shopify.request(url, 'POST', this.key, params);
  },

  /**
   * Deletes a record.
   *
   * @param {Number} id Record ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete(id) {
    const url = this.buildUrl(id);
    return this.shopify.request(url, 'DELETE');
  },

  /**
   * Iterates all the elements that match the params. And yields one at a time.
   * It buffers as much elements as possible with one single query and yields from that pool until its
   * depleted and then buffers again.
   *
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the individual element that is being iterated
   * @public
   */
  async *iterate(params) {
    do {
      const batch = await this.list(params);

      for (let i = 0; i < batch.length; i++) yield batch[i];

      params = batch.nextPageParameters;
    } while (params !== undefined);
  },

  /**
   * Gets a single record by its ID.
   *
   * @param {Number} id Record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(id, params) {
    const url = this.buildUrl(id, params);
    return this.shopify.request(url, 'GET', this.key);
  },

  /**
   * Gets a list of records.
   *
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  list(params) {
    const url = this.buildUrl(undefined, params);
    return this.shopify.request(url, 'GET', this.name);
  },

  /**
   * Updates a record.
   *
   * @param {Number} id Record ID
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(id, params) {
    const url = this.buildUrl(id);
    return this.shopify.request(url, 'PUT', this.key, params);
  },

  /**
   * Builds the request URL.
   *
   * @param {Number|String} [id] Record ID
   * @param {Object} [query] Query parameters
   * @return {Object} URL object
   * @private
   */
  buildUrl(id, query) {
    id || id === 0 || (id = '');

    let pathname = '/admin';

    if (this.shopify.options.apiVersion) {
      pathname += `/api/${this.shopify.options.apiVersion}`;
    }

    pathname += `/${this.name}/${id}`;
    pathname = pathname.replace(/\/+/g, '/').replace(/\/$/, '') + '.json';

    const url = { pathname, ...this.shopify.baseUrl };

    if (query) {
      url.search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });
    }

    return url;
  }
};

module.exports = base;
