'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a FulfillmentOrder instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentOrder(shopify) {
  this.shopify = shopify;

  this.name = 'fulfillment_orders';
  this.key = 'fulfillment_order';
}

assign(FulfillmentOrder.prototype, pick(base, ['get', 'buildUrl']));

/**
 * Retrieves a list of fulfillment orders on a shop for a specific app.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.list = function list(params) {
  const url = base.buildUrl.call(
    { ...this, name: 'assigned_fulfillment_orders' },
    undefined,
    params
  );
  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Marks a fulfillment order as cancelled.
 *
 * @param {Number} id Fulfillment order ID
 * @param {Object} params Fulfillment order properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.cancel = function cancel(id, params) {
  const url = this.buildUrl(`${id}/cancel`);
  return this.shopify.request(url, 'POST', this.key, params);
};

/**
 * Marks an in progress fulfillment order as incomplete, indicating the
 * fulfillment service is unable to ship any remaining items and intends to
 * close the fulfillment order.
 *
 * @param {Number} id Fulfillment order ID
 * @param {String} [message] The reason for marking the fulfillment order as
 *     incomplete
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.close = function close(id, message = '') {
  const url = this.buildUrl(`${id}/close`);
  return this.shopify.request(url, 'POST', this.key, { message });
};

/**
 * Moves a fulfillment order from one merchant managed location to another
 * merchant managed location.
 *
 * @param {Number} id Fulfillment order ID
 * @param {Number} locationId The ID of the location to which the fulfillment
 *     order will be moved
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.move = function move(id, locationId) {
  const url = this.buildUrl(`${id}/move`);
  return this.shopify
    .request(url, 'POST', undefined, {
      fulfillment_order: {
        new_location_id: locationId
      }
    })
    .then((body) => body.original_fulfillment_order);
};

/**
 * Retrieves a list of locations that a fulfillment order can potentially move
 * to.
 *
 * @param {Number} id Fulfillment order ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentOrder.prototype.locationsForMove = function locationsForMove(id) {
  const url = this.buildUrl(`${id}/locations_for_move`);
  return this.shopify.request(url, 'GET', 'locations_for_move');
};

module.exports = FulfillmentOrder;
