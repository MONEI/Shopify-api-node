'use strict';

const assign = require('lodash/assign');
const base = require('../mixins/base');

const Order = require('../resources/order.js');

/**
 * Creates a FulfillmentOrder instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentOrder(shopify) {
  this.shopify = { ...shopify };
  this.shopify.options = { ...shopify.options };
  this.shopify.options.apiVersion = '2020-01';

  this.parentName = 'fulfillments';
  this.key = 'fulfillment_order';
  this.name = 'fulfillment_orders';
}

assign(Order.prototype, base);

/**
 * Gets a list of fulfillment orders for an order.
 *
 * @param {Number} orderId Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.list = function list(orderId) {
  const orders = new Order(this.shopify);
  const url = orders.buildUrl(`${orderId}/fulfillment_orders`);
  return this.shopify.request(url, 'GET', `${this.key}s`);
};

/**
 * Gets a single fulfillment order by its ID.
 *
 * @param {Number} id Fulfilment Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.get = function get(id) {
  const url = this.buildUrl(id);
  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Cancels a fulfillment order.
 *
 * @param {Number} id Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.cancel = function cancel(id) {
  const url = this.buildUrl(`${id}/cancel`);

  return this.shopify
    .request(url, 'POST', undefined)
    .then((body) => body[this.key]);
};

/**
 * Closes a fulfillment order.
 *
 * @param {Number} id Order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.close = function close(id) {
  const url = this.buildUrl(`${id}/close`);

  return this.shopify
    .request(url, 'POST', undefined)
    .then((body) => body[this.key]);
};

/**
 * Moves a fulfillment order.
 *
 * @param {Number} id Order ID
 * @params {Object} [params] Move options
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.move = function move(id, params) {
  const url = this.buildUrl(`${id}/move`);

  return this.shopify
    .request(url, 'POST', undefined, params)
    .then((body) => body[this.key]);
};
module.exports = FulfillmentOrder;
