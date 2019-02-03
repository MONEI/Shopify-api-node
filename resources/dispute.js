'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const shopifyPayments = require('../mixins/shopify-payments');
const base = require('../mixins/base');

/**
 * Creates a Dispute instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Dispute(shopify) {
  this.shopify = shopify;

  this.name = 'disputes';
  this.key = 'dispute';
}

assign(Dispute.prototype, pick(base, ['get', 'list']));
Dispute.prototype.buildUrl = shopifyPayments.buildUrl;

module.exports = Dispute;
