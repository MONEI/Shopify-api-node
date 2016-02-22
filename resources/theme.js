'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a Theme instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Theme(shopify) {
  this.shopify = shopify;

  this.name = 'themes';
  this.key = 'theme';
}

_.assign(Theme.prototype, _.omit(base, ['count']));

module.exports = Theme;
