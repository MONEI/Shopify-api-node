'use strict';

const BaseChild = require('./base-child');

/**
 * OrderRisk resource.
 *
 * @public
 */
class OrderRisk extends BaseChild {
  /**
   * Creates an OrderRisk instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'orders';
    this.name = 'risks';
    this.key = 'risk';
  }
}

module.exports = OrderRisk;
