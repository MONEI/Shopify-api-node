'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a TaxService instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function TaxService(shopify) {
  this.shopify = shopify;

  this.name = 'tax_services';
  this.key = 'tax_service';
}

assign(TaxService.prototype, omit(base, ['count']));

module.exports = TaxService;
