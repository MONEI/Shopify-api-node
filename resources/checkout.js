'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Checkout instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Checkout(shopify) {
  this.shopify = shopify;

  this.name = 'checkouts';
  this.key = 'checkout';
}

assign(Checkout.prototype, pick(base, ['count', 'list', 'buildUrl']));

module.exports = Checkout;
