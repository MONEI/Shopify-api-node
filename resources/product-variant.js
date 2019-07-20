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

assign(
  ProductVariant.prototype, pick(baseChild,
    ['buildUrl', 'count', 'delete'])
);

/**
 * Gets a single product variant by its ID.
 *
 * @param {Number} id Product variant ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.get = function get(id, params) {
  let url = base.buildUrl.call(this, id, params);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Creates a new record.
 *
 * @param {Number} parentId Parent record ID
 * @param {Object} params Record properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.create = function(parentId, params) {
  let url = this.buildUrl(parentId);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Get a list of records.
 *
 * @param {Number} parentId Parent record ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ProductVariant.prototype.list = function(parentId, params) {
  let url = this.buildUrl(parentId, undefined, params);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
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
  let url = base.buildUrl.call(this, id);

  if (this.shopify.options.presentmentPrices) {
    url = assign(url, this.shopify.presentmentHeader);
  }

  return this.shopify.request(url, 'PUT', this.key, params);
};

module.exports = ProductVariant;
