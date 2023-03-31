'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');
const baseChild = require('../mixins/base-child');

/**
 * Creates a Metafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Metafield(shopify) {
  this.shopify = shopify;

  this.parentName = '';
  this.name = 'metafields';
  this.key = 'metafield';
}

assign(Metafield.prototype, base);

/**
 * Updates a metafield by ID, resource/resource ID.
 *
 * @param {Number} metaFieldId
 * @param {String} resource
 * @param {Number} resourceId
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Metafield.prototype.updateV2 = function (
  metaFieldId,
  resource,
  resourceId,
  params
) {
  this.parentName = resource;
  const url = baseChild.buildUrl.call(this, resourceId, metaFieldId);
  return this.shopify.request(url, 'PUT', undefined, params);
};

module.exports = Metafield;
