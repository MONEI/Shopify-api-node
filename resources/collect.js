'use strict';

const _ = require('lodash');

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

_.assign(Collect.prototype, _.omit(base, ['update']));

module.exports = Collect;
