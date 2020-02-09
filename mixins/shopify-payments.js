'use strict';

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

    let pathname = '/admin';

    if (this.shopify.options.apiVersion) {
      pathname += `/api/${this.shopify.options.apiVersion}`;
    }

    pathname += `/shopify_payments/${this.name}/${id}`;
    pathname = pathname.replace(/\/+/g, '/').replace(/\/$/, '') + '.json';

    const url = { pathname, ...this.shopify.baseUrl };

    if (query) {
      url.search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });
    }

    return url;
  }
};

module.exports = shopifyPayments;
