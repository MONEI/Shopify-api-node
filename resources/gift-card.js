'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a GiftCard instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function GiftCard(shopify) {
  this.shopify = shopify;

  this.name = 'gift_cards';
  this.key = 'gift_card';
}

_.assign(GiftCard.prototype, _.omit(base, ['delete']));

/**
 * Disables a gift card.
 *
 * @param {Number} id Gift card ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
GiftCard.prototype.disable = function disable(id) {
  const url = this.buildUrl(`${id}/disable`);
  return this.shopify.request(url, 'POST', this.key, { id });
};

/**
 * Searches for gift cards matching a given query.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
GiftCard.prototype.search = function search(params) {
  const url = this.buildUrl('search', params);
  return this.shopify.request(url, 'GET', this.name);
};

module.exports = GiftCard;
