'use strict';

const Base = require('./base');

/**
 * CustomerSavedSearch resource.
 *
 * @public
 */
class CustomerSavedSearch extends Base {
  /**
   * Creates a CustomerSavedSearch instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'customer_saved_searches';
    this.key = 'customer_saved_search';
  }

  /**
   * Gets all customers who match the criteria for the specified customer saved
   * search.
   *
   * @param {Number} id Customer saved search ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  customers(id, params) {
    const url = this.buildUrl(`${id}/customers`, params);
    return this.shopify.request(url, 'GET', 'customers');
  }
}

module.exports = CustomerSavedSearch;
