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

/**
 * Creates a discount code creation job.
 *
 * @param {String} priceRuleId price rule id to create
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
PriceRule.prototype.batch = function lookup(priceRuleId, params) {
  const url = this.buildUrl(`${priceRuleId}/batch`);
  return this.shopify.request(url, "POST", "discount_codes", params);
};

assign(PriceRule.prototype, omit(base, 'count'));

module.exports = PriceRule;
