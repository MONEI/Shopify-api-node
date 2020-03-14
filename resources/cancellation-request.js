'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates a CancellationRequest instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CancellationRequest(shopify) {
  this.shopify = shopify;

  this.parentName = 'fulfillment_orders';
  this.key = this.name = 'cancellation_request';
}

assign(CancellationRequest.prototype, pick(baseChild, 'buildUrl'));

/**
 * Sends a cancellation request to the fulfillment service of a fulfillment
 * order.
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {String} [message] The reason reason for the cancellation request
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CancellationRequest.prototype.create = function create(
  fulfillmentOrderId,
  message = ''
) {
  const url = this.buildUrl(fulfillmentOrderId);
  return this.shopify
    .request(url, 'POST', undefined, {
      [this.key]: { message }
    })
    .then((body) => body.fulfillment_order);
};

/**
 * Accepts a cancellation request sent to a fulfillment service for a
 * fulfillment order.
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {String} [message] The reason for accepting the cancellation request
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CancellationRequest.prototype.accept = function accept(
  fulfillmentOrderId,
  message = ''
) {
  const url = this.buildUrl(fulfillmentOrderId, 'accept');
  return this.shopify
    .request(url, 'POST', undefined, {
      [this.key]: { message }
    })
    .then((body) => body.fulfillment_order);
};

/**
 * Rejects a cancellation request sent to a fulfillment service for a
 * fulfillment order.
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {String} [message] The reason for rejecting the cancellation request
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CancellationRequest.prototype.reject = function reject(
  fulfillmentOrderId,
  message = ''
) {
  const url = this.buildUrl(fulfillmentOrderId, 'reject');
  return this.shopify
    .request(url, 'POST', undefined, {
      [this.key]: { message }
    })
    .then((body) => body.fulfillment_order);
};

module.exports = CancellationRequest;
