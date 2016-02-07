'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class CustomerGroup extends Base {

  get entity() {
    return 'customer_group';
  }

  get entityRoute() {
    return '/customer_groups';
  }

  customers(id) {
    return Adapter.post(this.buildURL(id + '/default'));
  }

};
