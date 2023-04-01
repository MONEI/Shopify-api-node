'use strict';
const qs = require('qs');

/**
 * Creates a Metafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Metafield(shopify) {
  this.shopify = shopify;

  this.name = 'metafields';
  this.key = 'metafield';
}

/**
 * Creates a new metafield.
 *
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @param {Object} params Metafield properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.create = function create(resourceName, resourceId, params) {
  const url = this.buildUrl(undefined, resourceName, resourceId);
  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Gets a list of metafield.
 *
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.list = function list(resourceName, resourceId, params) {
  const url = this.buildUrl(undefined, resourceName, resourceId, params);
  return this.shopify.request(url, 'GET', `${this.key}s`);
};

/**
 * Gets a single metafield by its ID.
 *
 * @param {Number} id Metafield ID
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.get = function get(id, resourceName, resourceId) {
  const url = this.buildUrl(id, resourceName, resourceId);
  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Updates a metafield.
 *
 * @param {Number} id Metafield ID
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @param {Object} params Metafield properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.update = function update(
  id,
  resourceName,
  resourceId,
  params
) {
  const url = this.buildUrl(id, resourceName, resourceId);
  return this.shopify.request(url, 'PUT', this.key, params);
};

/**
 * Deletes a metafield.
 *
 * @param {Number} id Metafield ID
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.delete = function remove(id, resourceName, resourceId) {
  const url = this.buildUrl(id, resourceName, resourceId);
  return this.shopify.request(url, 'DELETE');
};

/**
 * Builds the request URL.
 *
 * @param {Number} Id Metafield ID
 * @param {String} [resourceName] Resource name
 * @param {Number} [resourceId] Resource Id
 * @param {Object} [query] Query parameters
 * @return {Object} URL object
 * @private
 */
Metafield.prototype.buildUrl = function buildUrl(
  id,
  resourceName,
  resourceId,
  query
) {
  id || id === 0 || (id = '');

  let pathname = ['admin'];

  if (this.shopify.options.apiVersion) {
    pathname.push(`api/${this.shopify.options.apiVersion}`);
  }
  pathname.push(resourceName, resourceId, this.name, id);
  pathname =
    pathname.join('/').replace(/\/+/g, '/').replace(/\/$/, '') + '.json';
  const url = { pathname, ...this.shopify.baseUrl };
  if (query) {
    url.search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });
  }
  console.log(url);
  return url;
};
module.exports = Metafield;
