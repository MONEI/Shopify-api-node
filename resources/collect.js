'use strict';

const Base = require('./base');

/**
 * Collect resource.
 *
 * @public
 */
class Collect extends Base {
  /**
   * Creates a Collect instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'collects';
    this.key = 'collect';
  }
}

module.exports = Collect;
