'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a Shop instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Shop(shopify) {
  this.shopify = shopify;

  this.name = this.key = 'shop';
}

_.assign(Shop.prototype, _.pick(base, 'buildUrl'));

/**
 * Gets the configuration of the shop.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Shop.prototype.get = function get(params) {
  const url = this.buildUrl(undefined, params);
  return this.shopify.request(url, 'GET', this.key);
};

module.exports = Shop;
