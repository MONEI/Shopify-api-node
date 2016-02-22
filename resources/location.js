'use strict';

const _ = require('lodash');

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

_.assign(Location.prototype, _.pick(base, ['get', 'list', 'buildUrl']));

module.exports = Location;
