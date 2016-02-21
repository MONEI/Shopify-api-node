'use strict';

const Base = require('./base');

/**
 * Webhook resource.
 *
 * @public
 */
class Webhook extends Base {
  /**
   * Creates a Webhook instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'webhooks';
    this.key = 'webhook';
  }
}

module.exports = Webhook;
