'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

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

_.assign(Metafield.prototype, base);

module.exports = Metafield;
