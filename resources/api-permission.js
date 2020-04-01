'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates an ApiPermission instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ApiPermission(shopify) {
  this.shopify = shopify;

  this.name = 'api_permissions';
  this.key = 'api_permission';
}

assign(ApiPermission.prototype, pick(base, 'buildUrl'));

/**
 * Deletes a token, which revokes access.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ApiPermission.prototype.delete = function remove() {
  const url = this.buildUrl('current');
  return this.shopify.request(url, 'DELETE');
};

module.exports = ApiPermission;
