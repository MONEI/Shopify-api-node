'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Redirect instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Redirect(shopify) {
  this.shopify = shopify;

  this.name = 'redirects';
  this.key = 'redirect';
}

assign(Redirect.prototype, base);

module.exports = Redirect;
