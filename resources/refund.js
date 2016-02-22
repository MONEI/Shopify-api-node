'use strict';

const _ = require('lodash');

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

_.assign(Refund.prototype, _.pick(baseChild, ['get', 'buildUrl']));

module.exports = Refund;
