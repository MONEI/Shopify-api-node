'use strict';

const Base = require('./base');

/**
 * Customer resource.
 *
 * @public
 */
class Customer extends Base {
  /**
   * Creates a Customer instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'customers';
    this.key = 'customer';
  }

  /**
   * Returns a list of customers matching the given search parameters.
   *
   * @param {Object} params Search parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  search(params) {
    const url = this.buildUrl('search', params);
    return this.shopify.request(url, 'GET', this.name);
  }

  /**
   * Generates and retrieve an account activation URL for a customer.
   *
   * @param {Number} id Customer ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  accountActivationUrl(id) {
    const url = this.buildUrl(`${id}/account_activation_url`);
    return this.shopify.request(url, 'POST', undefined, {
      customer: { id }
    }).then(body => body.account_activation_url);
  }
}

module.exports = Customer;
