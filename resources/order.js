'use strict';

const Base = require('./base');

/**
 * Order resource.
 *
 * @public
 */
class Order extends Base {
  /**
   * Creates an Order instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'orders';
    this.key = 'order';
  }

  /**
   * Closes an order.
   *
   * @param {Number} id Order ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  close(id) {
    const url = this.buildUrl(`${id}/close`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }

  /**
   * Re-opens a closed order.
   *
   * @param {Number} id Order ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  open(id) {
    const url = this.buildUrl(`${id}/open`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }

  /**
   * Cancels an order.
   *
   * @param {Number} id Order ID
   * @params {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  cancel(id, params) {
    const url = this.buildUrl(`${id}/cancel`, params);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }
}

module.exports = Order;
