'use strict';

const Base = require('./base');

/**
 * Event resource.
 *
 * @public
 */
class Event extends Base {
  /**
   * Creates an Event instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'events';
    this.key = 'event';
  }
}

module.exports = Event;
