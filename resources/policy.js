'use strict';

const qs = require('qs');

/**
 * Policy resource.
 *
 * @public
 */
class Policy {
  /**
   * Creates a Policy instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    this.name = this.key = 'policies';
    this.shopify = shopify;
  }

  /**
   * Gets a list of policies.
   *
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  list(params) {
    let path = `/admin/${this.name}.json`;

    if (params) path += '?' + qs.stringify(params, { arrayFormat: 'brackets' });

    const url = Object.assign({ path }, this.shopify.baseUrl);
    return this.shopify.request(url, 'GET', this.key);
  }
}

module.exports = Policy;
