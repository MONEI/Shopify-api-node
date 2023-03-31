'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Metafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Metafield(shopify) {
  this.shopify = shopify;

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
  const urlString = `${resource}/${resourceId}/${this.name}`;
  if (!this.name === urlString) this.name = urlString;
  const url = this.buildUrl(metaFieldId);
  return this.shopify.request(url, 'PUT', undefined, params);
};

module.exports = Metafield;
