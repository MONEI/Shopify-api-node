'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates an InventoryLevel instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function InventoryLevel(shopify) {
  this.shopify = shopify;

  this.name = 'inventory_levels';
  this.key = 'inventory_level';
}

assign(InventoryLevel.prototype, pick(base, ['list', 'buildUrl']));

/**
 * Adjusts the inventory level of an inventory item at a single location.
 *
 * @param {Object} params Adjustment parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
InventoryLevel.prototype.adjust = function adjust(params) {
  const url = this.buildUrl('adjust');
  return this.shopify
    .request(url, 'POST', undefined, params)
    .then((body) => body[this.key]);
};

/**
 * Connects an inventory item to a location by creating an inventory level at
 * that location.
 *
 * @param {Object} params Connection parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
InventoryLevel.prototype.connect = function connect(params) {
  const url = this.buildUrl('connect');
  return this.shopify
    .request(url, 'POST', undefined, params)
    .then((body) => body[this.key]);
};

/**
 * Deletes an inventory level for an inventory item at a location.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
InventoryLevel.prototype.delete = function remove(params) {
  const url = this.buildUrl(undefined, params);
  return this.shopify.request(url, 'DELETE');
};

/**
 * Sets an inventory level for a single inventory item within a location.
 *
 * @param {Object} params Location and inventory item parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
InventoryLevel.prototype.set = function set(params) {
  const url = this.buildUrl('set');
  return this.shopify
    .request(url, 'POST', undefined, params)
    .then((body) => body[this.key]);
};

module.exports = InventoryLevel;
