'use strict';

const _ = require('lodash');

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

_.assign(ShippingZone.prototype, _.pick(base, ['list', 'buildUrl']));

module.exports = ShippingZone;
