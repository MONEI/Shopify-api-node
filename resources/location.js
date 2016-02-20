'use strict';

const Base = require('./base');

/**
 * Location resource.
 *
 * @public
 */
class Location extends Base {
  /**
   * Creates a Location instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'locations';
    this.key = 'location';
  }
}

module.exports = Location;
