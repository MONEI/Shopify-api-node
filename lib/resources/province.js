'use strict';
const BaseChild = require('../components/base_child');

module.exports = class Province extends BaseChild {

  get entity() {
    return 'province';
  }

  get parentRoute() {
    return '/countries';
  }

  get entityRoute() {
    return '/provinces';
  }

};
