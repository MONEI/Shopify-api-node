'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(Theme.prototype, omit(base, ['count']));

module.exports = Theme;
