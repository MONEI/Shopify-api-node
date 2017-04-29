'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a MarketingEvent instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function MarketingEvent(shopify) {
  this.shopify = shopify;

  this.name = 'marketing_events';
  this.key = 'marketing_event';
}

assign(MarketingEvent.prototype, base);

/**
 * Create marketing engagements on a marketing event.
 *
 * @param {Number} id Marketing event ID
 * @param {Array} params Engagements on marketing event
 * @return {Promise} Promise that resolves with the result
 * @public
 */
MarketingEvent.prototype.engagements = function engagements(id, params) {
  const url = this.buildUrl(`${id}/engagements`);
  return this.shopify.request(url, 'POST', 'engagements', params);
};

module.exports = MarketingEvent;
