'use strict';

const qs = require('qs');

/**
 * FulfillmentEvent resource.
 *
 * @public
 */
class FulfillmentEvent {
  /**
   * Creates a FulfillmentEvent instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
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
  list(orderId, fulfillmentId, params) {
    const url = this.buildUrl(orderId, fulfillmentId, undefined, params);
    return this.shopify.request(url, 'GET', `${this.key}s`);
  }

  /**
   * Gets a single fulfillment event by its ID.
   *
   * @param {Number} orderId Order ID
   * @param {Number} fulfillmentId Fulfillment ID
   * @param {Number} id Fulfillment event ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(orderId, fulfillmentId, id) {
    const url = this.buildUrl(orderId, fulfillmentId, id);
    return this.shopify.request(url, 'GET', this.key);
  }

  /**
   * Creates a fulfillment event.
   *
   * @param {Number} orderId Order ID
   * @param {Number} fulfillmentId Fulfillment ID
   * @param {Object} params Fulfillment event properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(orderId, fulfillmentId, params) {
    const url = this.buildUrl(orderId, fulfillmentId);
    return this.shopify.request(url, 'POST', undefined, { event: params })
      .then(body => body[this.key]);
  }

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
  update(orderId, fulfillmentId, id, params) {
    const url = this.buildUrl(orderId, fulfillmentId, id);
    return this.shopify.request(url, 'PUT', undefined, { event: params })
      .then(body => body[this.key]);
  }

  /**
   * Deletes a fulfillment event.
   *
   * @param {Number} orderId Order ID
   * @param {Number} fulfillmentId Fulfillment ID
   * @param {Number} id Fulfillment event ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete(orderId, fulfillmentId, id) {
    const url = this.buildUrl(orderId, fulfillmentId, id);
    return this.shopify.request(url, 'DELETE');
  }

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
  buildUrl(orderId, fulfillmentId, id, query) {
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

    return Object.assign({ path }, this.shopify.baseUrl);
  }
}

module.exports = FulfillmentEvent;
