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

  this.metafield = new Metafield(shopify, this.name);
}

assign(Product.prototype, base);

module.exports = Product;
