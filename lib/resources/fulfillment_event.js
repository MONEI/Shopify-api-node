/**
 * @public
 * @class FulfillmentEvent
 * @extends BaseChild
 * @description
 * @requires base_child
 * @requires adapter
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

class FulfillmentEvent extends BaseChild {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return {
      long: 'fulfillment_event',
      short: 'event'
    };
  }

  /**
  * @public
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/orders';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/fulfillments';
  }

  /**
  * @public
  * @description
  * @param {int} orderId - id of order
  * @param {int} fulfillmentId -
  * @returns {object} promise - request promise
  */
  all(orderId, fulfillmentId) {
    return Adapter.get(this.buildURL(orderId, fulfillmentId + '/events'));
  }

  /**
  * @public
  * @description
  * @param {int} orderId - id of order
  * @param {int} fulfillmentId -
  * @param {int} id - record id
  * @returns {object} promise - request promise
  */
  get(orderId, fulfillmentId, id) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.get(url);
  }

  /**
  * @public
  * @description
  * @param {int} orderId - id of order
  * @param {int} fulfillmentId -
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  create(orderId, fulfillmentId, fields) {
    let url = this.buildURL(orderId, fulfillmentId + '/events');
    return Adapter.post(url, this.entity, fields);
  }

  /**
  * @public
  * @description
  * @param {int} orderId - id of order
  * @param {int} fulfillmentId -
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(orderId, fulfillmentId, id, fields) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.put(url, this.entity, fields);
  }

  /**
  * @public
  * @description
  * @param {int} orderId - id of order
  * @param {int} fulfillmentId -
  * @param {int} id - record id
  * @returns {object} promise - request promise
  */
  delete(orderId, fulfillmentId, id) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.delete(url);
  }

}

module.exports = FulfillmentEvent;
