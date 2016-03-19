'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(Province.prototype, omit(baseChild, ['create', 'delete']));

module.exports = Province;
