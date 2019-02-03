'use strict';

const shopifyPayments = require('../mixins/shopify-payments');
const base = require('../mixins/base');

/**
 * Creates a Balance instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Balance(shopify) {
  this.shopify = shopify;

  this.name = 'balance';
}

Balance.prototype.list = base.list;
Balance.prototype.buildUrl = shopifyPayments.buildUrl;

/**
 * Gets a list of balance transactions.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Balance.prototype.transactions = function transactions(params) {
  const url = this.buildUrl('transactions', params);
  return this.shopify.request(url, 'GET', 'transactions');
};

module.exports = Balance;
