'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a TenderTransaction instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function TenderTransaction(shopify) {
  this.shopify = shopify;

  this.name = 'tender_transactions';
}

assign(TenderTransaction.prototype, pick(base, ['list', 'buildUrl']));

module.exports = TenderTransaction;
