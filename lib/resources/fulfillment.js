'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class Fulfillment extends BaseChild {

  get entity() {
    return 'fulfillment';
  }

  get parentRoute() {
    return '/orders';
  }

  get entityRoute() {
    return '/fulfillments';
  }

  complete(orderId, id) {
    return Adapter.post(this.buildURL(orderId, id + '/complete'));
  }

  cancel(orderId, id) {
    return Adapter.post(this.buildURL(orderId, id + '/cancel'));
  }

  delete(orderId, id) {
    return this.cancel(orderId, id);
  }

};
