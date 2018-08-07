'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');
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

assign(Metafield.prototype, base);

module.exports = Metafield;
