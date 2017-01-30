'use strict';

const assign = require('lodash/assign');

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

assign(Product.prototype, base);

/**
 * Get all metafields that belong to a product
 *
 * @param {Number} product Product ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.metafields = function(id) {
  const url = this.buildUrl(`${id}/metafields`);
  return this.shopify.request(url);
};

module.exports = Product;
