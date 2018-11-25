'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a SmartCollection instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function SmartCollection(shopify) {
  this.shopify = shopify;

  this.name = 'smart_collections';
  this.key = 'smart_collection';
}

assign(SmartCollection.prototype, base);

/**
 * Sets the ordering type and/or the manual order of products in a smart
 * collection.
 *
 * @param {Number} id Smart collection ID
 * @param {Object} params Ordering parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SmartCollection.prototype.order = function order(id, params) {
  const url = this.buildUrl(`${id}/order`, params);
  return this.shopify.request(url, 'PUT', undefined, {});
};

/**
 * Retrieves a list of products in a smart collection.
 *
 * @param {Number} id Smart collection ID
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SmartCollection.prototype.products = function products(id, params) {
  const url = this.buildUrl(`${id}/products`, params);
  return this.shopify.request(url, 'GET', 'products');
};

module.exports = SmartCollection;
