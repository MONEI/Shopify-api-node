'use strict';
const Base = require('../components/base');

module.exports = class Redirect extends Base {

  get entity() {
    return 'redirect';
  }

  get entityRoute() {
    return '/redirects';
  }

};
