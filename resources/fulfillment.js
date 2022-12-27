'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');
const baseChild = require('../mixins/base-child');

/**
 * Creates a Fulfillment instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Fulfillment(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'fulfillments';
  this.key = 'fulfillment';
}

assign(Fulfillment.prototype, omit(baseChild, ['delete']));

/**
 * Completes a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.complete = function complete(orderId, id) {
  const url = this.buildUrl(orderId, `${id}/complete`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Opens a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.open = function open(orderId, id) {
  const url = this.buildUrl(orderId, `${id}/open`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Cancels a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.cancel = function cancel(orderId, id) {
  const url = this.buildUrl(orderId, `${id}/cancel`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Cancels a fulfillment.
 *
 * @param {Number} id Fulfillment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.cancelV2 = function cancelV2(id) {
  const url = base.buildUrl.call(this, `${id}/cancel`);
  return this.shopify
    .request(url, 'POST', undefined, {})
    .then((body) => body[this.key]);
};

/**
 * Creates a fulfillment for one or many fulfillment orders. The fulfillment
 * orders are associated with the same order and are assigned to the same
 * location.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.createV2 = function createV2(params) {
  const url = base.buildUrl.call(this);
  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Updates the tracking information for a fulfillment.
 *
 * @param {Number} id Fulfillment ID
 * @param {Object} params Tracking information
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.updateTracking = function updateTracking(id, params) {
  const url = base.buildUrl.call(this, `${id}/update_tracking`);
  return this.shopify.request(url, 'POST', this.key, params);
};

module.exports = Fulfillment;
