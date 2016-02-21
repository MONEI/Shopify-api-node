'use strict';

const BaseChild = require('./base-child');

/**
 * Transaction resource.
 *
 * @public
 */
class Transaction extends BaseChild {
  /**
   * Creates a Transaction instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'orders';
    this.name = 'transactions';
    this.key = 'transaction';
  }
}

module.exports = Transaction;
