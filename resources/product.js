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
Product.prototype.get = function get(id, params) {
  const url = this.buildUrl(id, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.key, undefined, headers);
};

/**
 * Creates a new product.
 *
 * @param {Object} params Product properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.create = function create(params) {
  const url = this.buildUrl();
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'POST', this.key, params, headers);
};

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.list = function list(params) {
  const url = this.buildUrl(undefined, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.name, undefined, headers);
};

/**
 * Updates a product.
 *
 * @param {Number} id Products ID
 * @param {Object} params Products properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.update = function update(id, params) {
  const url = this.buildUrl(id);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'PUT', this.key, params, headers);
};

module.exports = Product;
