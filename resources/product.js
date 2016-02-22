'use strict';

const _ = require('lodash');

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

_.assign(Product.prototype, base);

module.exports = Product;
