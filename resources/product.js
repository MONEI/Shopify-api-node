'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(Product.prototype, omit(base, ['buildUrl', 'count', 'delete']));

/**
 * Builds the request URL.
 *
 * @param {Number|String} [id] Record ID
 * @param {Object} [query] Query parameters
 * @return {Object} URL object
 * @private
 */
Product.prototype.buildUrl = function(id, query) {
  const baseUrl = base.buildUrl.call(this, id, query);

  if (this.shopify.options.presentmentPrices) {
    baseUrl.headers = { ['X-Shopify-Api-Features']: 'include-presentment-prices' };
  }

  return baseUrl;
};

/**
 * Counts the number of records.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.count = function(params) {
  const key = 'count';
  const url = base.buildUrl.call(this, key, params);
  return this.shopify.request(url, 'GET', key);
};

/**
 * Deletes a record.
 *
 * @param {Number} id Record ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.delete = function(id) {
  const url = base.buildUrl.call(this, id);
  return this.shopify.request(url, 'DELETE');
};

module.exports = Product;
