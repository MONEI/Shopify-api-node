'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a CarrierService instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CarrierService(shopify) {
  this.shopify = shopify;

  this.name = 'carrier_services';
  this.key = 'carrier_service';
}

_.assign(CarrierService.prototype, _.omit(base, ['count']));

module.exports = CarrierService;
