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
 * https://help.shopify.com/api/reference/refund#calculate
 *
 * @param {Number} parentId Parent record ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Refund.prototype.calculate = function complete(orderId, params) {
  const url = this.buildUrl(orderId, '/calculate');
  return this.shopify.request(url, 'POST', undefined, params)
    .then(body => body[this.key]);
};

module.exports = Refund;
