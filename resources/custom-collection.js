'use strict';

const Base = require('./base');

/**
 * CustomCollection resource.
 *
 * @public
 */
class CustomCollection extends Base {
  /**
   * Creates a CustomCollection instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'custom_collections';
    this.key = 'custom_collection';
  }
}

module.exports = CustomCollection;
