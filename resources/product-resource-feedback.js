'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates a ProductResourceFeedback instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductResourceFeedback(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.key = this.name = 'resource_feedback';
}

assign(
  ProductResourceFeedback.prototype,
  pick(baseChild, ['buildUrl', 'create', 'list'])
);

module.exports = ProductResourceFeedback;
