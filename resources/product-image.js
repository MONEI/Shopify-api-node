'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Creates a ProductImage instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductImage(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.name = 'images';
  this.key = 'image';
}

assign(ProductImage.prototype, baseChild);

module.exports = ProductImage;
