'use strict';
const Base = require('../components/base');

module.exports = class CustomCollection extends Base {

  get entity() {
    return 'custom_collection';
  }

  get entityRoute() {
    return '/custom_collections';
  }

};
