'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a CustomCollection instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CustomCollection(shopify) {
  this.shopify = shopify;

  this.name = 'custom_collections';
  this.key = 'custom_collection';
}

assign(CustomCollection.prototype, base);

module.exports = CustomCollection;
