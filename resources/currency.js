'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Currency instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Currency(shopify) {
  this.shopify = shopify;

  this.name = 'currencies';
}

assign(Currency.prototype, pick(base, ['list', 'buildUrl']));

module.exports = Currency;
