'use strict';

const shopifyPaymentsChild = require('../mixins/shopify-payments-child');
const baseChild = require('../mixins/base-child');

/**
 * Creates a DisputeEvidence instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DisputeEvidence(shopify) {
  this.shopify = shopify;

  this.parentName = 'disputes';
  this.name = 'dispute_evidences';
  this.key = 'dispute_evidence';
}

DisputeEvidence.prototype.buildUrl = shopifyPaymentsChild.buildUrl;

/**
 * Returns the dispute evidence associated with the dispute ID
 *
 * @param {Number} disputeId The dispute ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 */
DisputeEvidence.prototype.get = function get(disputeId, params) {
  return baseChild.get.call(this, disputeId, undefined, params);
};

/**
 * Updates the dispute evidence associated with dispute ID
 *
 * @param {Number} disputeId The dispute ID
 * @param {Object} params An object containing the refund refusal explanation
 * @return {Promise} Promise that resolves with the result
 */
DisputeEvidence.prototype.update = function update(disputeId, params) {
  return baseChild.update.call(this, disputeId, undefined, params);
};

module.exports = DisputeEvidence;
