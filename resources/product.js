'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Product instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Product(shopify) {
  this.shopify = shopify;

  this.name = 'products';
  this.key = 'product';
}

assign(Product.prototype, pick(base, ['buildUrl', 'delete', 'count']));

/**
 * Gets a single product by its ID.
 *
 * @param {Number} id Product ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.get = function(id, params) {
  const url = this.buildUrl(id, params);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Creates a new product.
 *
 * @param {Object} params Product properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.create = function(params) {
  const url = this.buildUrl();

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.list = function(params) {
  const url = this.buildUrl(undefined, params);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Updates a product.
 *
 * @param {Number} id Products ID
 * @param {Object} params Products properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.update = function(id, params) {
  const url = this.buildUrl(id);

  if (this.shopify.options.presentmentPrices) {
    url.headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'PUT', this.key, params);
};

module.exports = Product;
