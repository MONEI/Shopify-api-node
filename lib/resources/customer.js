'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Customer extends Base {

  get entity() {
    return 'customer';
  }

  get entityRoute() {
    return '/customers';
  }

  search(params) {
    return Adapter.get(this.buildURL('search', params), this.entity);
  }

  createActivationUrl(id) {
    let url = this.buildURL(id + '/account_activation_url');
    let entity = {
      short: this.entity,
      long: 'account_activation_url'
    };
    return Adapter.post(url, entity, {id: id});
  }

};
