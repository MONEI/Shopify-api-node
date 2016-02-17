'use strict';

const pluralize = require('pluralize');
const qs = require('qs');

/**
 * Base class for resources that have a single parent.
 *
 * @private
 */
class BaseChild {
  /**
   * Creates a base object.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    this.shopify = shopify;
  }

  /**
   * Get all records.
   *
   * @param {Number} parentId Parent record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  all(parentId, params) {
    const url = this.buildUrl(parentId, undefined, params);
    return this.shopify.request(url, 'GET', pluralize(this.key));
  }

  /**
   * Counts the number of records.
   *
   * @param {Number} parentId Parent record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  count(parentId, params) {
    const key = 'count';
    const url = this.buildUrl(parentId, key, params);
    return this.shopify.request(url, 'GET', key);
  }

  /**
   * Get a single record by its ID.
   *
   * @param {Number} parentId Parent record ID
   * @param {Number} id Record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(parentId, id, params) {
    const url = this.buildUrl(parentId, id, params);
    return this.shopify.request(url, 'GET', this.key);
  }

  /**
   * Creates a new record.
   *
   * @param {Number} parentId Parent record ID
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(parentId, params) {
    const url = this.buildUrl(parentId);
    return this.shopify.request(url, 'POST', this.key, params);
  }

  /**
   * Updates a record.
   *
   * @param {Number} parentId Parent record ID
   * @param {Number} id Record ID
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(parentId, id, params) {
    const url = this.buildUrl(parentId, id);
    return this.shopify.request(url, 'PUT', this.key, params);
  }

  /**
   * Deletes a record.
   *
   * @param {Number} parentId Parent record ID
   * @param {Number} id Record ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete(parentId, id) {
    return this.shopify.request(this.buildUrl(parentId, id), 'DELETE');
  }

  /**
   * Builds the request URL.
   *
   * @param {Number|String} parentId Parent record ID
   * @param {Number|String} [id] Record ID
   * @param {Object} [query] Query parameters
   * @return {Object} URL object
   * @private
   */
  buildUrl(parentId, id, query) {
    id || id === 0 || (id = '');

    let path = `/admin/${this.parentName}/${parentId}/${this.name}/${id}`
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');

    path += '.json';

    if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

    return Object.assign({ path }, this.shopify.baseUrl);
  }
}

module.exports = BaseChild;
