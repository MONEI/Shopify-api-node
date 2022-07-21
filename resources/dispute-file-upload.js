'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const shopifyPaymentsChild = require('../mixins/shopify-payments-child');
const baseChild = require('../mixins/base-child');

/**
 * Creates a DisputeFileUpload instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DisputeFileUpload(shopify) {
  this.shopify = shopify;

  this.parentName = 'disputes';
  this.name = 'dispute_file_uploads';
  this.key = 'dispute_file_upload';
}

assign(DisputeFileUpload.prototype, pick(baseChild, ['create', 'delete']));
DisputeFileUpload.prototype.buildUrl = shopifyPaymentsChild.buildUrl;

module.exports = DisputeFileUpload;
