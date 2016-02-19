'use strict';

const Base = require('./base');

/**
 * FulfillmentService resource.
 *
 * @public
 */
class FulfillmentService extends Base {
  /**
   * Creates a FulfillmentService instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'fulfillment_services';
    this.key = 'fulfillment_service';
  }
}

module.exports = FulfillmentService;
