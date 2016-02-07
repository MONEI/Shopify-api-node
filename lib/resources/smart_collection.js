'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class SmartCollection extends Base {

  get entity() {
    return 'smart_collection';
  }

  get entityRoute() {
    return '/smart_collections';
  }

  order(id, params) {
    return Adapter.put(this.buildURL(id + '/order', params));
  }

};
