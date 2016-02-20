'use strict';

const Base = require('./base');

/**
 * Product resource.
 *
 * @public
 */
class Product extends Base {
  /**
   * Creates a Product instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'products';
    this.key = 'product';
  }
}

module.exports = Product;
