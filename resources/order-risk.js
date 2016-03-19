'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(OrderRisk.prototype, omit(baseChild, ['count']));

module.exports = OrderRisk;
