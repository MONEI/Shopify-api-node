'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates an Order instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Order(shopify) {
  this.shopify = shopify;

  this.name = 'orders';
  this.key = 'order';
}

assign(Order.prototype, base);

/**
 * Closes an order.
 *
 * @param {Number} id Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.close = function close(id) {
  const url = this.buildUrl(`${id}/close`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Re-opens a closed order.
 *
 * @param {Number} id Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.open = function open(id) {
  const url = this.buildUrl(`${id}/open`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Cancels an order.
 *
 * @param {Number} id Order ID
 * @params {Object} [params] Cancel options
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.cancel = function cancel(id, params) {
  const url = this.buildUrl(`${id}/cancel`);
  return this.shopify
    .request(url, 'POST', undefined, params)
    .then((body) => body[this.key]);
};

/**
 * Retrieves a list of all fulfillment orders for an order.
 *
 * @param {Number} id Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.fulfillmentOrders = function fulfillmentOrders(id) {
  const url = this.buildUrl(`${id}/fulfillment_orders`);
  return this.shopify.request(url, 'GET', 'fulfillment_orders');
};

module.exports = Order;
