'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a Page instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Page(shopify) {
  this.shopify = shopify;

  this.name = 'pages';
  this.key = 'page';
}

_.assign(Page.prototype, base);

module.exports = Page;
