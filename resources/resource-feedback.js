'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a ResourceFeedback instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ResourceFeedback(shopify) {
  this.shopify = shopify;

  this.name = 'resource_feedback';
  this.key = 'resource_feedback';
}

assign(
  ResourceFeedback.prototype,
  omit(base, ['count', 'delete', 'get', 'update'])
);

module.exports = ResourceFeedback;
