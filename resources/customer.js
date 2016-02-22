'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a Customer instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Customer(shopify) {
  this.shopify = shopify;

  this.name = 'customers';
  this.key = 'customer';
}

_.assign(Customer.prototype, base);

/**
 * Returns a list of customers matching the given search parameters.
 *
 * @param {Object} params Search parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Customer.prototype.search = function search(params) {
  const url = this.buildUrl('search', params);
  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Generates and retrieve an account activation URL for a customer.
 *
 * @param {Number} id Customer ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Customer.prototype.accountActivationUrl = function accountActivationUrl(id) {
  const url = this.buildUrl(`${id}/account_activation_url`);
  return this.shopify.request(url, 'POST', undefined, {
    customer: { id }
  }).then(body => body.account_activation_url);
};

module.exports = Customer;
