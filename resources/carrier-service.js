'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(CarrierService.prototype, omit(base, ['count']));

module.exports = CarrierService;
