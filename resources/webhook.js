'use strict';

const _ = require('lodash');

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

_.assign(Webhook.prototype, base);

module.exports = Webhook;
