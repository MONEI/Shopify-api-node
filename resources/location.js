'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

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

assign(Location.prototype, pick(base, ['get', 'list', 'buildUrl']));

module.exports = Location;
