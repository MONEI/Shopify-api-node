'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates an ApplicationCharge instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ApplicationCharge(shopify) {
  this.shopify = shopify;

  this.name = 'application_charges';
  this.key = 'application_charge';
}

assign(ApplicationCharge.prototype, omit(base, ['count', 'delete', 'update']));

/**
 * Activates a previously accepted one-time application charge.
 *
 * @param {Number} id Application charge ID
 * @param {Object} params Application change properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
ApplicationCharge.prototype.activate = function activate(id, params) {
  const url = this.buildUrl(`${id}/activate`);
  return this.shopify.request(url, 'POST', this.key, params);
};

module.exports = ApplicationCharge;
