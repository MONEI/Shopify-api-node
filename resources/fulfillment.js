'use strict';

const BaseChild = require('./base-child');

/**
 * Fulfillment resource.
 *
 * @public
 */
class Fulfillment extends BaseChild {
  /**
   * Creates a Fulfillment instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'orders';
    this.name = 'fulfillments';
    this.key = 'fulfillment';
  }

  /**
   * Completes a pending fulfillment.
   *
   * @param {Number} orderId Order ID
   * @param {Number} id Fulfillment id
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  complete(orderId, id) {
    const url = this.buildUrl(orderId, `${id}/complete`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }

  /**
   * Cancels a pending fulfillment.
   *
   * @param {Number} orderId Order ID
   * @param {Number} id Fulfillment id
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  cancel(orderId, id) {
    const url = this.buildUrl(orderId, `${id}/cancel`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }
}

module.exports = Fulfillment;
