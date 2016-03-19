'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Webhook instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Webhook(shopify) {
  this.shopify = shopify;

  this.name = 'webhooks';
  this.key = 'webhook';
}

assign(Webhook.prototype, base);

module.exports = Webhook;
