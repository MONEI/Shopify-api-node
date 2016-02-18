'use strict';

const Base = require('./base');

/**
 * Country resource.
 *
 * @public
 */
class Country extends Base {
  /**
   * Creates a Country instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'countries';
    this.key = 'country';
  }
}

module.exports = Country;
