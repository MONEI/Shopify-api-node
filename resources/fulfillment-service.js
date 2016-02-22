'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a FulfillmentService instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentService(shopify) {
  this.shopify = shopify;

  this.name = 'fulfillment_services';
  this.key = 'fulfillment_service';
}

_.assign(FulfillmentService.prototype, _.omit(base, ['count']));

module.exports = FulfillmentService;
