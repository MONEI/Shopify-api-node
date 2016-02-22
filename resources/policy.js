'use strict';

const _ = require('lodash');

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

_.assign(Policy.prototype, _.pick(base, ['list', 'buildUrl']));

module.exports = Policy;
