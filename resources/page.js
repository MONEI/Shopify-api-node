'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

const Metafield = require('./resource-metafield');

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

  this.metafield = new Metafield(shopify, this.name);
}

assign(Page.prototype, base);

module.exports = Page;
