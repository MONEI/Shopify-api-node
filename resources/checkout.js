'use strict';

const _ = require('lodash');

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

_.assign(Checkout.prototype, _.pick(base, ['count', 'list', 'buildUrl']));

module.exports = Checkout;
