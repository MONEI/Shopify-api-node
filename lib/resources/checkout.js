'use strict';
const Base = require('../components/base');

module.exports = class Checkout extends Base {

  get entity() {
    return 'checkout';
  }

  get entityRoute() {
    return '/checkouts';
  }

};
