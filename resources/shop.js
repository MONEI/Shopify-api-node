'use strict';

const qs = require('qs');

/**
 * Shop resource.
 *
 * @public
 */
class Shop {
  /**
   * Creates a Shop instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    this.name = this.key = 'shop';
    this.shopify = shopify;
  }

  /**
   * Gets the configuration of the shop.
   *
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(params) {
    let path = `/admin/${this.name}.json`;

    if (params) path += '?' + qs.stringify(params, { arrayFormat: 'brackets' });

    const url = Object.assign({ path }, this.shopify.baseUrl);
    return this.shopify.request(url, 'GET', this.key);
  }
}

module.exports = Shop;
