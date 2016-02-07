'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class FulfillmentEvent extends BaseChild {

  get entity() {
    return {
      long: 'fulfillment_event',
      short: 'event'
    };
  }

  get parentRoute() {
    return '/orders';
  }

  get entityRoute() {
    return '/fulfillments';
  }

  all(orderId, fulfillmentId) {
    return Adapter.get(this.buildURL(orderId, fulfillmentId + '/events'));
  }

  get(orderId, fulfillmentId, id) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.get(url);
  }

  create(orderId, fulfillmentId, fields) {
    let url = this.buildURL(orderId, fulfillmentId + '/events');
    return Adapter.post(url, this.entity, fields);
  }

  update(orderId, fulfillmentId, id, fields) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.put(url, this.entity, fields);
  }

  delete(orderId, fulfillmentId, id) {
    let url = this.buildURL(orderId, fulfillmentId + '/events/' + id);
    return Adapter.delete(url);
  }

};
