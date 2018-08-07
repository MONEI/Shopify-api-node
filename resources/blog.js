'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Blog instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Blog(shopify) {
  this.shopify = shopify;

  this.name = 'blogs';
  this.key = 'blog';

  this.metafield = new Metafield(shopify, this.name);
}

assign(Blog.prototype, base);

module.exports = Blog;
