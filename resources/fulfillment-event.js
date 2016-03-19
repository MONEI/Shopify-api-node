'use strict';

const assign = require('lodash/assign');
const qs = require('qs');

/**
 * Creates a FulfillmentEvent instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentEvent(shopify) {
  this.shopify = shopify;

  this.parentName = 'fulfillments';
  this.key = 'fulfillment_event';
  this.name = 'events';
}

/**
 * Gets a list of fulfillment events for a fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentEvent.prototype.list = function list(orderId, fulfillmentId, params) {
  const url = this.buildUrl(orderId, fulfillmentId, undefined, params);
  return this.shopify.request(url, 'GET', `${this.key}s`);
};

/**
 * Gets a single fulfillment event by its ID.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Number} id Fulfillment event ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentEvent.prototype.get = function get(orderId, fulfillmentId, id) {
  const url = this.buildUrl(orderId, fulfillmentId, id);
  return this.shopify.request(url, 'GET', this.key);
};

/**
 * Creates a fulfillment event.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Object} params Fulfillment event properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentEvent.prototype.create = function create(orderId, fulfillmentId, params) {
  const url = this.buildUrl(orderId, fulfillmentId);
  return this.shopify.request(url, 'POST', undefined, { event: params })
    .then(body => body[this.key]);
};

/**
 * Updates a fulfillment event.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Number} id Fulfillment event ID
 * @param {Object} params Fulfillment event properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentEvent.prototype.update = function update(orderId, fulfillmentId, id, params) {
  const url = this.buildUrl(orderId, fulfillmentId, id);
  return this.shopify.request(url, 'PUT', undefined, { event: params })
    .then(body => body[this.key]);
};

/**
 * Deletes a fulfillment event.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Number} id Fulfillment event ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
FulfillmentEvent.prototype.delete = function remove(orderId, fulfillmentId, id) {
  const url = this.buildUrl(orderId, fulfillmentId, id);
  return this.shopify.request(url, 'DELETE');
};

/**
 * Builds the request URL.
 *
 * @param {Number} orderId Order ID
 * @param {Number} fulfillmentId Fulfillment ID
 * @param {Number} id Fulfillment event ID
 * @param {Object} [params] Query parameters
 * @return {Object} URL object
 * @private
 */
FulfillmentEvent.prototype.buildUrl = function buildUrl(orderId, fulfillmentId, id, query) {
  id || id === 0 || (id = '');

  let path = [
    '/admin/orders',
    orderId,
    this.parentName,
    fulfillmentId,
    this.name,
    id
  ].join('/');

  path = path.replace(/\/+/g, '/').replace(/\/$/, '') + '.json';

  if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

  return assign({ path }, this.shopify.baseUrl);
};

module.exports = FulfillmentEvent;
