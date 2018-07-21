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

module.exports = Location;
