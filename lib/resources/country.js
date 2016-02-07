'use strict';
const Base = require('../components/base');

module.exports = class Country extends Base {

  get entity() {
    return 'country';
  }

  get entityRoute() {
    return '/countries';
  }

};
