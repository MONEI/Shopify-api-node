'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a DraftOrder instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DraftOrder(shopify) {
  this.shopify = shopify;

  this.name = 'draft_orders';
  this.key = 'draft_order';
}

assign(DraftOrder.prototype, base);

/**
 * Completes a draft order.
 *
 * @param {Number} id Draft order ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
DraftOrder.prototype.complete = function complete(id, params) {
  const url = this.buildUrl(`${id}/complete`, params);
  return this.shopify.request(url, 'PUT', this.key);
};

/**
 * Sends an invoice for a draft order.
 *
 * @param {Number} id Draft order ID
 * @param {Object} params Invoice properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
DraftOrder.prototype.sendInvoice = function sendInvoice(id, params) {
  const url = this.buildUrl(`${id}/send_invoice`);
  return this.shopify.request(url, 'POST', 'draft_order_invoice', params);
};

module.exports = DraftOrder;
