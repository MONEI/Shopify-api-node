'use strict';

const assign = require('lodash/assign');
const qs = require('qs');

/**
 * This provides methods used by the Shopify Payments resources. It's not meant
 * to be used directly.
 *
 * @mixin
 */
const shopifyPayments = {
  /**
   * Builds the request URL.
   *
   * @param {Number|String} [id] Record ID
   * @param {Object} [query] Query parameters
   * @return {Object} URL object
   * @private
   */
  buildUrl(id, query) {
    id || id === 0 || (id = '');

    let path = '/admin';

    if (this.shopify.options.apiVersion) {
      path += `/api/${this.shopify.options.apiVersion}`;
    }

    path += `/shopify_payments/${this.name}/${id}`;
    path = path.replace(/\/+/g, '/').replace(/\/$/, '');
    path += '.json';

    if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

    return assign({ path }, this.shopify.baseUrl);
  }
};

module.exports = shopifyPayments;
