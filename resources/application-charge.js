'use strict';

const _ = require('lodash');

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

_.assign(ApplicationCharge.prototype, _.omit(base, [
  'count',
  'delete',
  'update'
]));

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
  return this.shopify.request(url, 'POST', undefined, {
    [this.key]: params
  });
};

module.exports = ApplicationCharge;
