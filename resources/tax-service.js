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

assign(TaxService.prototype, omit(base, ['count', 'delete']));

/**
 * Destroys a tax service.
 *
 * @param {Number} Tax service ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
TaxService.prototype.delete = function remove(id) {
  const url = this.buildUrl(id);
  return this.shopify.request(url, 'DELETE', this.key);
};

module.exports = TaxService;
