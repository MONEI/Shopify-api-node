'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates a ProductVariant instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductResourceFeedback(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.name = 'resource_feedback';
  this.key = 'resource_feedback';
}

assign(ProductResourceFeedback.prototype, pick(baseChild, [
  'buildUrl',
  'count',
  'delete'
]));

/**
 * Creates a new product variant.
 *
 * @param {Number} productId Product ID
 * @param {Object} params Product variant properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductResourceFeedback.prototype.create = function(productId, params) {
  const url = this.buildUrl(productId);

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
ProductResourceFeedback.prototype.list = function(productId, params) {
  const url = this.buildUrl(productId, undefined, params);

  return this.shopify.request(url, 'GET', this.name);
};

module.exports = ProductResourceFeedback;
