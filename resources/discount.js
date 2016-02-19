'use strict';

const Base = require('./base');

/**
 * Discount resource.
 *
 * @public
 */
class Discount extends Base {
  /**
   * Creates a Discount instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'discounts';
    this.key = 'discount';
  }

  /**
   * Enables a discount.
   *
   * @param {Number} id Discount ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  enable(id) {
    const url = this.buildUrl(`${id}/enable`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }

  /**
   * Disables a discount.
   *
   * @param {Number} id Discount ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  disable(id) {
    const url = this.buildUrl(`${id}/disable`);
    return this.shopify.request(url, 'POST', undefined, {})
      .then(body => body[this.key]);
  }
}

module.exports = Discount;
