'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const baseChild = require('../mixins/base-child');

/**
 * Creates a ProductListing instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductListing(shopify) {
  this.shopify = shopify;

  this.parentName = 'applications';
  this.name = 'product_listings';
  this.key = 'product_listing';
}

assign(ProductListing.prototype, omit(baseChild, [
  'create',
  'delete',
  'update'
]));

/**
 * Retrieves product IDs that are published to a particular application.
 *
 * @param {Number} parentId Application ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductListing.prototype.productIds = function productIds(parentId, params) {
  const key = 'product_ids';
  const url = this.buildUrl(parentId, key, params);
  return this.shopify.request(url, 'GET', key);
};

module.exports = ProductListing;
