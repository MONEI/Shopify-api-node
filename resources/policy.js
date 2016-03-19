'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Policy instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Policy(shopify) {
  this.shopify = shopify;

  this.name = this.key = 'policies';
}

assign(Policy.prototype, pick(base, ['list', 'buildUrl']));

module.exports = Policy;
