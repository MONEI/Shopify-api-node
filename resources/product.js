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
 * Gets a single record by its ID.
 *
 * @param {Number} id Record ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.get = function(id, params) {
  let url = this.buildUrl(id, params);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Creates a new record.
 *
 * @param {Object} params Record properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.create = function(params) {
  let url = this.buildUrl();

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Gets a list of records.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.list = function(params) {
  let url = this.buildUrl(undefined, params);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Updates a record.
 *
 * @param {Number} id Record ID
 * @param {Object} params Record properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.update = function(id, params) {
  let url = this.buildUrl(id);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'PUT', this.key, params);
};

module.exports = Product;
