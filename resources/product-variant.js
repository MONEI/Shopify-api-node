'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

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

assign(ProductVariant.prototype, pick(baseChild, [
  'buildUrl',
  'count',
  'delete'
]));

/**
 * Gets a single product variant by its ID.
 *
 * @param {Number} id Product variant ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.get = function get(id, params) {
  const url = base.buildUrl.call(this, id, params);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Creates a new product variant.
 *
 * @param {Number} productId Product ID
 * @param {Object} params Product variant properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.create = function(productId, params) {
  const url = this.buildUrl(productId);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Get a list of product variants.
 *
 * @param {Number} productId Product ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.list = function(productId, params) {
  const url = this.buildUrl(productId, undefined, params);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Updates an existing product variant.
 *
 * @param {Number} id Product variant ID
 * @param {Object} params Product variant properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.update = function update(id, params) {
  const url = base.buildUrl.call(this, id);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'PUT', this.key, params);
};

module.exports = ProductVariant;
