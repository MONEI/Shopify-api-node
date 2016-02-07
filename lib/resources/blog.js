'use strict';
const Base = require('../components/base');

module.exports = class Blog extends Base {

  get entity() {
    return 'blog';
  }

  get entityRoute() {
    return '/blogs';
  }

};
