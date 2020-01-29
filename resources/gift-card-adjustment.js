'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const baseChild = require('../mixins/base-child');

/**
 * Creates a GiftCardAdjustment instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function GiftCardAdjustment(shopify) {
  this.shopify = shopify;

  this.parentName = 'gift_cards';
  this.name = 'adjustments';
  this.key = 'adjustment';
}

assign(
  GiftCardAdjustment.prototype,
  omit(baseChild, ['count', 'delete', 'update'])
);

module.exports = GiftCardAdjustment;
