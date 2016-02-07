'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Discount extends Base {

  get entity() {
    return 'discount';
  }

  get entityRoute() {
    return '/discounts';
  }

  disable(id) {
    return Adapter.post(this.buildURL(id + '/disable'));
  }

  enable(id) {
    return Adapter.post(this.buildURL(id + '/enable'));
  }

};
