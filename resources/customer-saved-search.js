'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a CustomerSavedSearch instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CustomerSavedSearch(shopify) {
  this.shopify = shopify;

  this.name = 'customer_saved_searches';
  this.key = 'customer_saved_search';
}

assign(CustomerSavedSearch.prototype, base);

/**
 * Gets all customers who match the criteria for the specified customer saved
 * search.
 *
 * @param {Number} id Customer saved search ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerSavedSearch.prototype.customers = function customers(id, params) {
  const url = this.buildUrl(`${id}/customers`, params);
  return this.shopify.request(url, 'GET', 'customers');
};

module.exports = CustomerSavedSearch;
