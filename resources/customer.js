'use strict';

const assign = require('lodash/assign');

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

assign(Customer.prototype, base);

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
  return this.shopify
    .request(url, 'POST', undefined, {
      customer: { id }
    })
    .then((body) => body.account_activation_url);
};

/**
 * Sends an account invite for the customer.
 *
 * @param {Number} id Customer ID
 * @param {Object} params Optional params for adjusting the sent email
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Customer.prototype.sendInvite = function sendInvite(id, params) {
  const url = this.buildUrl(`${id}/send_invite`);
  return this.shopify.request(url, 'POST', 'customer_invite', params || {});
};

/**
 * Get all orders belonging to a customer.
 *
 * @param {Number} id Customer ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Customer.prototype.orders = function orders(id, params) {
  const url = this.buildUrl(`${id}/orders`, params);
  return this.shopify.request(url, 'GET', 'orders');
};

module.exports = Customer;
