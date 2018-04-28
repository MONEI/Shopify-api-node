'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates an InventoryItem instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function InventoryItem(shopify) {
  this.shopify = shopify;

  this.name = 'inventory_items';
  this.key = 'inventory_item';
}

assign(InventoryItem.prototype, omit(base, ['count', 'create', 'delete']));

module.exports = InventoryItem;
