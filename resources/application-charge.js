'use strict';

const Base = require('./base');

/**
 * ApplicationCharge resource.
 *
 * @public
 */
class ApplicationCharge extends Base {
  /**
   * Creates an ApplicationCharge instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'application_charges';
    this.key = 'application_charge';
  }

  /**
   * Activates a previously accepted one-time application charge.
   *
   * @param {Number|String} id Application charge ID
   * @param {Object} params Application change properties
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

module.exports = ApplicationCharge;
