'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Creates a Metafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Metafield(shopify) {
  this.shopify = shopify;

  this.name = 'metafields';
  this.key = 'metafield';
}

assign(Metafield.prototype, baseChild);

module.exports = Metafield;
