'use strict';

const Base = require('./base');

/**
 * CarrierService resource.
 *
 * @public
 */
class CarrierService extends Base {
  /**
   * Creates a CarrierService instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'carrier_services';
    this.key = 'carrier_service';
  }
}

module.exports = CarrierService;
