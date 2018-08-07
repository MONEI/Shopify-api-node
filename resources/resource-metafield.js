'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');
const baseChild = require('../mixins/base-child');

// TODO: implement Metafields for following resources:
// Article, Collection, Product Variant, Product Image

/**
 * Creates a ResourceMetafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ResourceMetafield(shopify, resourceName) {
  this.shopify = shopify;

  this.name = 'metafields';
  this.key = 'metafield';
  this.parentName = resourceName;
}

assign(ResourceMetafield.prototype, baseChild);

module.exports = ResourceMetafield;
