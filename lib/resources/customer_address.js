'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');
const pluralize = require('pluralize');

module.exports = class CustomerAddress extends BaseChild {

  get entity() {
    return {
      short: 'address',
      long: 'customer_address'
    };
  }

  get parentRoute() {
    return '/customers';
  }

  get entityRoute() {
    return '/addresses';
  }

  all(parentId, params) {
    let url = this.buildURL(parentId, '', params);
    return Adapter.get(url, pluralize(this.entity.short));
  }

  set(parentId, params) {
    return Adapter.put(this.buildURL(parentId, 'set', params), '', {});
  }

  default(parentId, id) {
    return Adapter.put(this.buildURL(parentId, id + '/default'), '', {});
  }

};
