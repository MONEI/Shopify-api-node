'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates an DiscountCodeCreation instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function DiscountCodeCreationJob(shopify) {
  this.shopify = shopify;

  this.parentName = 'price_rules';
  this.name = 'batch';
  this.key = 'discount_code_creation';
}

assign(DiscountCodeCreationJob.prototype, pick(baseChild, ['buildUrl', 'get']));

/**
 * Creates a discount code creation job.
 *
 * @param {Number} priceRuleId Price rule ID
 * @param {Array} params Array of discount codes
 * @return {Promise} Promise that resolves with the result
 * @public
 */
DiscountCodeCreationJob.prototype.create = function create(
  priceRuleId,
  params
) {
  const url = this.buildUrl(priceRuleId);
  return this.shopify
    .request(url, 'POST', undefined, {
      discount_codes: params
    })
    .then((data) => data[this.key]);
};

/**
 * Retrieves a list of discount codes for a discount code creation job.
 *
 * @param {Number} priceRuleId Price rule ID
 * @param {Number} batchId Discount code creation job ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
DiscountCodeCreationJob.prototype.discountCodes = function discountCodes(
  priceRuleId,
  batchId
) {
  const url = this.buildUrl(priceRuleId, `${batchId}/discount_codes`);
  return this.shopify.request(url, 'GET', 'discount_codes');
};

module.exports = DiscountCodeCreationJob;
