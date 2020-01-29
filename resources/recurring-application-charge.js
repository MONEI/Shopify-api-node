'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates a RecurringApplicationCharge instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function RecurringApplicationCharge(shopify) {
  this.shopify = shopify;

  this.name = 'recurring_application_charges';
  this.key = 'recurring_application_charge';
}

assign(RecurringApplicationCharge.prototype, omit(base, ['count', 'update']));

/**
 * Activates a recurring application charge.
 *
 * @param {Number} id Recurring application charge ID
 * @param {Object} params Recurring application charge properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
RecurringApplicationCharge.prototype.activate = function activate(id, params) {
  const url = this.buildUrl(`${id}/activate`);
  return this.shopify
    .request(url, 'POST', undefined, { [this.key]: params })
    .then((body) => body[this.key]);
};

/**
 * Customize a recurring application charge.
 *
 * @param {Number} id Recurring application charge ID
 * @param {Object} params Customization parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
RecurringApplicationCharge.prototype.customize = function customize(
  id,
  params
) {
  const url = this.buildUrl(`${id}/customize`, { [this.key]: params });
  return this.shopify.request(url, 'PUT', this.key);
};

module.exports = RecurringApplicationCharge;
