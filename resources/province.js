'use strict';

const _ = require('lodash');

const baseChild = require('../mixins/base-child');

/**
 * Creates a Province instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Province(shopify) {
  this.shopify = shopify;

  this.parentName = 'countries';
  this.name = 'provinces';
  this.key = 'province';
}

_.assign(Province.prototype, _.omit(baseChild, ['create', 'delete']));

module.exports = Province;
