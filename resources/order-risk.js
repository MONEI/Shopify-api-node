'use strict';

const _ = require('lodash');

const baseChild = require('../mixins/base-child');

/**
 * Creates an OrderRisk instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function OrderRisk(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'risks';
  this.key = 'risk';
}

_.assign(OrderRisk.prototype, _.omit(baseChild, ['count']));

module.exports = OrderRisk;
