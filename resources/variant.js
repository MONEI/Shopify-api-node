'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a variant instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Variant(shopify) {
  this.shopify = shopify;

  this.name = 'variants';
  this.key = 'variants';
}

assign(Variant.prototype, pick(base, ['buildUrl']));

/**
 * Get all metafields that belong to a product
 *
 * @param {Number} variant Variant ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Variant.prototype.metafields = function(id) {
  const url = this.buildUrl(`${id}/metafields`);
  return this.shopify.request(url);
};

module.exports = Variant;
