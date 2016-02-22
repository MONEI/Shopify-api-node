'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a Discount instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Discount(shopify) {
  this.shopify = shopify;

  this.name = 'discounts';
  this.key = 'discount';
}

_.assign(Discount.prototype, _.omit(base, ['count', 'update']));

/**
 * Enables a discount.
 *
 * @param {Number} id Discount ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Discount.prototype.enable = function enable(id) {
  const url = this.buildUrl(`${id}/enable`);
  return this.shopify.request(url, 'POST', undefined, {})
    .then(body => body[this.key]);
};

/**
 * Disables a discount.
 *
 * @param {Number} id Discount ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Discount.prototype.disable = function disable(id) {
  const url = this.buildUrl(`${id}/disable`);
  return this.shopify.request(url, 'POST', undefined, {})
    .then(body => body[this.key]);
};

module.exports = Discount;
