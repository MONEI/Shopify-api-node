'use strict';

const Base = require('./base');

/**
 * GiftCard resource.
 *
 * @public
 */
class GiftCard extends Base {
  /**
   * Creates a GiftCard instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'gift_cards';
    this.key = 'gift_card';
  }

  /**
   * Disables a gift card.
   *
   * @param {Number} id Gift card ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  disable(id) {
    const url = this.buildUrl(`${id}/disable`);
    return this.shopify.request(url, 'POST', this.key, { id });
  }

  /**
   * Searches for gift cards matching a given query.
   *
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  search(params) {
    const url = this.buildUrl('search', params);
    return this.shopify.request(url, 'GET', this.name);
  }
}

module.exports = GiftCard;
