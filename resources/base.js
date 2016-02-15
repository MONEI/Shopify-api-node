'use strict';

const pluralize = require('pluralize');
const qs = require('qs');

/**
 * Base class for resources that have no relationships with other resources.
 *
 * @private
 */
class Base {
  /**
   * Creates a base object.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    this.shopify = shopify;
  }

  /**
   * Gets all records.
   *
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  all(params) {
    const url = this.buildURL(undefined, params);
    return this.shopify.request(url, 'GET', pluralize(this.key));
  }

  /**
   * Counts the number of records.
   *
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  count() {
    const key = 'count';
    return this.shopify.request(this.buildURL(key), 'GET', key);
  }

  /**
   * Get a single record by its ID.
   *
   * @param {Number} id Record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(id, params) {
    return this.shopify.request(this.buildURL(id, params), 'GET', this.key);
  }

  /**
   * Creates a new record.
   *
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(params) {
    return this.shopify.request(this.buildURL(), 'POST', this.key, params);
  }

  /**
   * Updates a record.
   *
   * @param {Number} id Record ID
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(id, params) {
    return this.shopify.request(this.buildURL(id), 'PUT', this.key, params);
  }

  /**
   * Deletes a record.
   *
   * @param {Number} id Record ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete(id) {
    return this.shopify.request(this.buildURL(id), 'DELETE');
  }

  /**
   * Builds the request URL.
   *
   * @param {Number|String} [id] Record ID
   * @param {Object} [query] Query parameters
   * @returns {Object} URL object
   * @private
   */
  buildURL(id, query) {
    id || id === 0 || (id = '');

    let path = `/admin/${this.name}/${id}`
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');

    path += '.json';

    if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

    return Object.assign({ path }, this.shopify.baseUrl);
  }
}

module.exports = Base;
