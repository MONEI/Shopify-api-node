'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const baseChild = require('../mixins/base-child');
const base = require('../mixins/base');

/**
 * Creates a DiscountCode instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DiscountCode(shopify) {
  this.shopify = shopify;

  this.parentName = 'price_rules';
  this.name = 'discount_codes';
  this.key = 'discount_code';
}

assign(DiscountCode.prototype, omit(baseChild, 'count'));

/**
 * Searches by discount code.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
DiscountCode.prototype.lookup = function lookup(params) {
  const url = base.buildUrl.call(this, 'lookup', params);
  return this.shopify.request(url, 'GET', this.key);
};

module.exports = DiscountCode;
