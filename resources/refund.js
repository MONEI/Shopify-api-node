'use strict';

const qs = require('qs');

/**
 * Refund resource.
 *
 * @public
 */
class Refund {
  /**
   * Creates a Refund instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    this.shopify = shopify;
    this.parentName = 'orders';
    this.name = 'refunds';
    this.key = 'refund';
  }

  /**
   * Retrieves a specific refund.
   *
   * @param {Number} orderId Order ID
   * @param {Number} id Refund ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(orderId, id, params) {
    let path = `/admin/${this.parentName}/${orderId}/${this.name}/${id}.json`;

    if (params) path += '?' + qs.stringify(params, { arrayFormat: 'brackets' });

    const url = Object.assign({ path }, this.shopify.baseUrl);
    return this.shopify.request(url, 'GET', this.key);
  }
}

module.exports = Refund;
