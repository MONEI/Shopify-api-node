'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates an ApplicationCredit instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ApplicationCredit(shopify) {
  this.shopify = shopify;

  this.name = 'application_credits';
  this.key = 'application_credit';
}

assign(ApplicationCredit.prototype, omit(base, ['count', 'delete', 'update']));

module.exports = ApplicationCredit;
