'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

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

assign(Transaction.prototype, omit(baseChild, ['delete', 'update']));

module.exports = Transaction;
