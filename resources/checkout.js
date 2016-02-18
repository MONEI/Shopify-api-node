'use strict';

const Base = require('./base');

/**
 * Checkout resource.
 *
 * @public
 */
class Checkout extends Base {
  /**
   * Creates a Checkout instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'checkouts';
    this.key = 'checkout';
  }
}

module.exports = Checkout;
