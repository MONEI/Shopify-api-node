'use strict';

const BaseChild = require('./base-child');

/**
 * Province resource.
 *
 * @public
 */
class Province extends BaseChild {
  /**
   * Creates a Province instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'countries';
    this.name = 'provinces';
    this.key = 'province';
  }
}

module.exports = Province;
