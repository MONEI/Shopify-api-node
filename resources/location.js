'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a Location instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Location(shopify) {
  this.shopify = shopify;

  this.name = 'locations';
  this.key = 'location';
}

assign(Location.prototype, omit(base, ['create', 'delete', 'update']));

/**
 * Retrieves a list of inventory levels for a location.
 *
 * @param {Number} id Location ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Location.prototype.inventoryLevels = function inventoryLevels(id, params) {
  const key = 'inventory_levels';
  const url = this.buildUrl(`${id}/${key}`, params);
  return this.shopify.request(url, 'GET', key);
};

module.exports = Location;
