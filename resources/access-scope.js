'use strict';

/**
 * Creates an AccessScope instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function AccessScope(shopify) {
  this.shopify = shopify;

  this.name = 'access_scopes';
}

/**
 * Retrieves a list of access scopes associated to the access token.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
AccessScope.prototype.list = function list() {
  const pathname = `/admin/oauth/${this.name}.json`;
  const url = { pathname, ...this.shopify.baseUrl };
  return this.shopify.request(url, 'GET', this.name);
};

module.exports = AccessScope;
