'use strict';

const _ = require('lodash');

const baseChild = require('../mixins/base-child');

/**
 * Creates a Transaction instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Transaction(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'transactions';
  this.key = 'transaction';
}

_.assign(Transaction.prototype, _.omit(baseChild, ['delete', 'update']));

module.exports = Transaction;
