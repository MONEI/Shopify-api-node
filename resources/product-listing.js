'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(ProductListing.prototype, omit(base, ['create', 'update']));

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
  return this.shopify.request(url, 'PUT', this.key, params);
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
