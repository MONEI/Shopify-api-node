'use strict';
const BaseChild = require('../components/base_child');

module.exports = class Transaction extends BaseChild {

  get entity() {
    return 'transaction';
  }

  get parentRoute() {
    return '/orders';
  }

  get entityRoute() {
    return '/transactions';
  }

};
