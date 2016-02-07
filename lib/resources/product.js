'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Product extends Base {

  get entity() {
    return 'product';
  }

  get entityRoute() {
    return '/products';
  }

  events(id, params) {
    return Adapter.get(this.buildURL(id, 'events', params));
  }

};
