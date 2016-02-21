'use strict';

const Base = require('./base');

/**
 * SmartCollection resource.
 *
 * @public
 */
class SmartCollection extends Base {
  /**
   * Creates a SmartCollection instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'smart_collections';
    this.key = 'smart_collection';
  }

  /**
   * Sets the ordering tpy and/or the manual order of products in a smart
   * collection.
   *
   * @param {Number} id Smart collection ID
   * @param {Object} params Ordering parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  order(id, params) {
    const url = this.buildUrl(`${id}/order`, params);
    return this.shopify.request(url, 'PUT', undefined, {});
  }
}

module.exports = SmartCollection;
