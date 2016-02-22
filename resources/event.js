'use strict';

const _ = require('lodash');

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

_.assign(Event.prototype, _.omit(base, ['create', 'delete', 'update']));

module.exports = Event;
