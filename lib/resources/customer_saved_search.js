'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class CustomerSavedSearch extends Base {

  get entity() {
    return 'customer_saved_search';
  }

  get entityRoute() {
    return '/customer_saved_searches';
  }

  getCustomersForId(id) {
    return Adapter.get(this.buildURL(id + '/customers'));
  }

};
