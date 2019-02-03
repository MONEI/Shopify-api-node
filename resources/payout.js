'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const shopifyPayments = require('../mixins/shopify-payments');
const base = require('../mixins/base');

/**
 * Creates a Payout instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Payout(shopify) {
  this.shopify = shopify;

  this.name = 'payouts';
  this.key = 'payout';
}

assign(Payout.prototype, pick(base, ['get', 'list']));
Payout.prototype.buildUrl = shopifyPayments.buildUrl;

module.exports = Payout;
