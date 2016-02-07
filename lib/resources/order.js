'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Order extends Base {

  get entity() {
    return 'order';
  }

  get entityRoute() {
    return '/orders';
  }

  close(id) {
    return Adapter.get(this.buildURL(id + '/close'), this.entity);
  }

  open(id) {
    return Adapter.get(this.buildURL(id + '/open'), this.entity);
  }

  cancel(id, params) {
    return Adapter.get(this.buildURL(id + '/cancel', params), this.entity);
  }

  events(id, params) {
    return Adapter.get(this.buildURL(id + '/events', params), 'events');
  }

};
