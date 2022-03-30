'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a DeprecatedApiCall instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DeprecatedApiCall(shopify) {
  this.shopify = shopify;

  this.name = 'deprecated_api_calls';
}

assign(DeprecatedApiCall.prototype, pick(base, ['buildUrl', 'list']));

module.exports = DeprecatedApiCall;
