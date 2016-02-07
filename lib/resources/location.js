'use strict';
const Base = require('../components/base');

module.exports = class Location extends Base {

  get entity() {
    return 'location';
  }

  get entityRoute() {
    return '/locations';
  }

};
