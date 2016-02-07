'use strict';
const BaseChild = require('../components/base_child');

module.exports = class Refund extends BaseChild {

  get entity() {
    return 'refund';
  }

  get parentRoute() {
    return '/orders';
  }

  get entityRoute() {
    return '/refunds';
  }

};
