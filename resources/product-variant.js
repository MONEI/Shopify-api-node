'use strict';

const qs = require('qs');

const BaseChild = require('./base-child');

/**
 * ProductVariant resource.
 *
 * @public
 */
class ProductVariant extends BaseChild {
  /**
   * Creates an ProductVariant instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'products';
    this.name = 'variants';
    this.key = 'variant';
  }

  /**
   * Gets a single product variant by its ID.
   *
   * @param {Number} id Product variant ID
   * @params {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(id, params) {
    let path = `/admin/${this.name}/${id}.json`;

    if (params) path += '?' + qs.stringify(params, { arrayFormat: 'brackets' });

    const url = Object.assign({ path }, this.shopify.baseUrl);
    return this.shopify.request(url, 'GET', this.key);
  }

  /**
   * Updates an existing product variant.
   *
   * @param {Number} id Product variant ID
   * @params {Object} params Product variant properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(id, params) {
    const url = Object.assign({
      path: `/admin/${this.name}/${id}.json`
    }, this.shopify.baseUrl);

    return this.shopify.request(url, 'PUT', this.key, params);
  }
}

module.exports = ProductVariant;
