'use strict';
const Base = require('../components/base');

module.exports = class Theme extends Base {

  get entity() {
    return 'theme';
  }

  get entityRoute() {
    return '/themes';
  }

};
