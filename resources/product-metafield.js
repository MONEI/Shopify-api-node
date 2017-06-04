'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Creates a ProductMetafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductMetafield(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.name = 'metafields';
  this.key = 'metafield';
}

assign(ProductMetafield.prototype, baseChild);

module.exports = ProductMetafield;
