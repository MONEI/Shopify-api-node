'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Country instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Country(shopify) {
  this.shopify = shopify;

  this.name = 'countries';
  this.key = 'country';
}

assign(Country.prototype, base);

module.exports = Country;
