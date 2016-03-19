'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a ShippingZone instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ShippingZone(shopify) {
  this.shopify = shopify;

  this.name = this.key = 'shipping_zones';
}

assign(ShippingZone.prototype, pick(base, ['list', 'buildUrl']));

module.exports = ShippingZone;
