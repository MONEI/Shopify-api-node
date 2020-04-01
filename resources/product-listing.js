'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a ProductListing instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductListing(shopify) {
  this.shopify = shopify;

  this.name = 'product_listings';
  this.key = 'product_listing';
}

assign(ProductListing.prototype, pick(base, ['count', 'buildUrl', 'delete']));

/**
 * Gets a single product by its ID.
 *
 * @param {Number} id Product ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductListing.prototype.get = function get(id, params) {
  const url = this.buildUrl(id, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.key, undefined, headers);
};

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductListing.prototype.list = function list(params) {
  const url = this.buildUrl(undefined, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.name, undefined, headers);
};

/**
 * Creates a product listing.
 *
 * @param {Number} productId The ID of the product to publish
 * @param {Object} [params] Body parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductListing.prototype.create = function create(productId, params) {
  params || (params = { product_id: productId });
  const url = this.buildUrl(productId);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'PUT', this.key, params, headers);
};

/**
 * Retrieves product IDs that are published to a particular application.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductListing.prototype.productIds = function productIds(params) {
  const key = 'product_ids';
  const url = this.buildUrl(key, params);
  return this.shopify.request(url, 'GET', key);
};

module.exports = ProductListing;
