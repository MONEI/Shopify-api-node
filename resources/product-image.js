'use strict';

const BaseChild = require('./base-child');

/**
 * ProductImage resource.
 *
 * @public
 */
class ProductImage extends BaseChild {
  /**
   * Creates an ProductImage instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'products';
    this.name = 'images';
    this.key = 'image';
  }
}

module.exports = ProductImage;
