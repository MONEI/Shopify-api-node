'use strict';

const Base = require('./base');

/**
 * Theme resource.
 *
 * @public
 */
class Theme extends Base {
  /**
   * Creates a Theme instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'themes';
    this.key = 'theme';
  }
}

module.exports = Theme;
