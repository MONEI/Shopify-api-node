'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates a FulfillmentRequest instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentRequest(shopify) {
  this.shopify = shopify;

  this.parentName = 'fulfillment_orders';
  this.key = this.name = 'fulfillment_request';
}

assign(FulfillmentRequest.prototype, pick(baseChild, 'buildUrl'));

/**
 * Sends a fulfillment request to the fulfillment service of a fulfillment
 * order.
 *
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {Object} params The fulfillment request data
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentRequest.prototype.create = function create(
  fulfillmentOrderId,
  params
) {
  const url = this.buildUrl(fulfillmentOrderId);
  return this.shopify
    .request(url, 'POST', undefined, { [this.key]: params })
    .then((body) => body.original_fulfillment_order);
};

/**
 * Accepts a fulfillment request sent to a fulfillment service for a fulfillment
 * order.
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {String} [message] The reason for accepting the fulfillment request
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentRequest.prototype.accept = function accept(
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
 * Rejects a fulfillment request sent to a fulfillment service for a
 * fulfillment order.
 *
 * @params {Number} fulfillmentOrderId Fulfillment order ID
 * @params {String} [message] The reason for rejecting the fulfillment request
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentRequest.prototype.reject = function reject(
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

module.exports = FulfillmentRequest;
