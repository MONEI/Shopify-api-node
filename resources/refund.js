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

module.exports = Refund;
