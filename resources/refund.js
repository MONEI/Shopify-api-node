'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates a Refund instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Refund(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'refunds';
  this.key = 'refund';
}

assign(Refund.prototype, pick(baseChild, ['get', 'buildUrl']));

/**
 * Calculates a refund.
 *
 * @param {Number} orderId order ID
 * @param {Object} params How much shipping and line items to refund
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Refund.prototype.calculate = function calculate(orderId, params) {
  const url = this.buildUrl(orderId, 'calculate');
  return this.shopify.request(url, 'POST', this.key, params);
};

module.exports = Refund;
