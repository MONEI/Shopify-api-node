'use strict';

const Base = require('./base');

/**
 * Redirect resource.
 *
 * @public
 */
class Redirect extends Base {
  /**
   * Creates a Redirect instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'redirects';
    this.key = 'redirect';
  }
}

module.exports = Redirect;
