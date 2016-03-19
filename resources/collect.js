'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a Collect instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Collect(shopify) {
  this.shopify = shopify;

  this.name = 'collects';
  this.key = 'collect';
}

assign(Collect.prototype, omit(base, ['update']));

module.exports = Collect;
