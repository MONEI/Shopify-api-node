'use strict';
const BaseChild = require('../components/base_child');

module.exports = class OrderRisk extends BaseChild {

  get entity() {
    return 'risk';
  }

  get parentRoute() {
    return '/orders';
  }

  get entityRoute() {
    return '/risks';
  }

};
