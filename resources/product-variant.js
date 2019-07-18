'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const baseChild = require('../mixins/base-child');
const base = require('../mixins/base');

/**
 * Creates a ProductVariant instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductVariant(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.name = 'variants';
  this.key = 'variant';
}

assign(ProductVariant.prototype, omit(baseChild, ['get', 'update', 'buildUrl', 'count', 'delete']));

/**
 * Builds the request URL.
 *
 * @param {Number} parentId Parent record ID
 * @param {Number|String} [id] Record ID
 * @param {Object} [query] Query parameters
 * @return {Object} URL object
 * @private
 */
ProductVariant.prototype.buildUrl = function(parentId, id, query) {
  const baseUrl = baseChild.buildUrl.call(this, parentId, id, query);

  if (this.shopify.options.presentmentPrices) {
    baseUrl.headers = { ['X-Shopify-Api-Features']: 'include-presentment-prices' };
  }

  return baseUrl;
};

/**
 * Counts the number of records.
 *
 * @param {Number} parentId Parent record ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.count = function(parentId, params) {
  const key = 'count';
  const url = baseChild.buildUrl.call(this, parentId, key, params);
  return this.shopify.request(url, 'GET', key);
};

/**
 * Gets a single product variant by its ID.
 *
 * @param {Number} id Product variant ID
 * @params {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.get = function get(id, params) {
  const url = base.buildUrl.call(this, id, params);

  if (this.shopify.options.presentmentPrices) {
    url.headers = { ['X-Shopify-Api-Features']: 'include-presentment-prices' };
  }

  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Updates an existing product variant.
 *
 * @param {Number} id Product variant ID
 * @params {Object} params Product variant properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.update = function update(id, params) {
  const url = base.buildUrl.call(this, id);
  return this.shopify.request(url, 'PUT', this.key, params);
};

/**
 * Deletes a record.
 *
 * @param {Number} parentId Parent record ID
 * @param {Number} id Record ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.delete = function(parentId, id, params) {
  const url = baseChild.buildUrl.call(this, parentId, id, params);
  return this.shopify.request(url, 'DELETE');
};

module.exports = ProductVariant;
