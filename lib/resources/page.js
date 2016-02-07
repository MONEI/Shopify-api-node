'use strict';
const Base = require('../components/base');

module.exports = class Page extends Base {

  get entity() {
    return 'page';
  }

  get entityRoute() {
    return '/pages';
  }

};
