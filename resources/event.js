'use strict';

const assign = require('lodash/assign');
const omit = require('lodash/omit');

const base = require('../mixins/base');

/**
 * Creates an Event instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Event(shopify) {
  this.shopify = shopify;

  this.name = 'events';
  this.key = 'event';
}

assign(Event.prototype, omit(base, ['create', 'delete', 'update']));

module.exports = Event;
