'use strict';

const Base = require('./base');

/**
 * RecurringApplicationCharge resource.
 *
 * @public
 */
class RecurringApplicationCharge extends Base {
  /**
   * Creates a RecurringApplicationCharge instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'recurring_application_charges';
    this.key = 'recurring_application_charge';
  }

  /**
   * Activates a recurring application charge.
   *
   * @param {Number} id Recurring application charge ID
   * @param {Object} params Recurring application charge properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  activate(id, params) {
    const url = this.buildUrl(`${id}/activate`);
    return this.shopify.request(url, 'POST', undefined, {
      [this.key]: params
    });
  }
}

module.exports = RecurringApplicationCharge;
