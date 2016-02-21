'use strict';

const Base = require('./base');

/**
 * Metafield resource.
 *
 * @public
 */
class Metafield extends Base {
  /**
   * Creates a Metafield instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'metafields';
    this.key = 'metafield';
  }
}

module.exports = Metafield;
