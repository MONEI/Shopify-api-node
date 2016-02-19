'use strict';

const BaseChild = require('./base-child');

/**
 * CustomerAddress resource.
 *
 * @public
 */
class CustomerAddress extends BaseChild {
  /**
   * Creates a CustomerAddress instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'customers';
    this.name = 'addresses';
    this.key = 'customer_address';
  }

  /**
   * Gets a list of addresses for a customer.
   *
   * @param {Number} customerId Customer ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  list(customerId, params) {
    const url = this.buildUrl(customerId, undefined, params);
    return this.shopify.request(url, 'GET', this.name);
  }

  /**
   * Creates a new address for a customer.
   *
   * @param {Number} customerId Customer ID
   * @param {Object} params Address properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(customerId, params) {
    const url = this.buildUrl(customerId);
    return this.shopify.request(url, 'POST', undefined, { address: params })
      .then(body => body[this.key]);
  }

  /**
   * Updates a customer address.
   *
   * @param {Number} customerId Customer ID
   * @param {Number} id Address ID
   * @param {Object} params Address properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(customerId, id, params) {
    const url = this.buildUrl(customerId, id);
    return this.shopify.request(url, 'PUT', undefined, { address: params })
      .then(body => body[this.key]);
  }

  /**
   * Performs bulk operations against a number of addresses.
   *
   * @param {Number} customerId Customer ID
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  set(customerId, params) {
    const url = this.buildUrl(customerId, 'set', params);
    return this.shopify.request(url, 'PUT');
  }

  /**
   * Sets default address for a customer.
   *
   * @param {Number} customerId Customer ID
   * @param {Number} id Address ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  default(customerId, id) {
    const url = this.buildUrl(customerId, `${id}/default`);
    return this.shopify.request(url, 'PUT', this.key);
  }
}

module.exports = CustomerAddress;
