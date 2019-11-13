'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a PriceRule instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function PriceRule(shopify) {
  this.shopify = shopify;

  this.name = 'price_rules';
  this.key = 'price_rule';
}

assign(PriceRule.prototype, omit(base, 'count'));

module.exports = PriceRule;
