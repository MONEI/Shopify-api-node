'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Collection instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Collection(shopify) {
  this.shopify = shopify;

  this.name = 'collections';
  this.key = 'collection';
}

assign(Collection.prototype, pick(base, ['get', 'buildUrl']));

/**
 * Retrieves a list of products belonging to a collection.
 *
 * @param {Number} id Collection ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Collection.prototype.products = function products(id, params) {
  const url = this.buildUrl(`${id}/products`, params);
  return this.shopify.request(url, 'GET', 'products');
};

module.exports = Collection;
