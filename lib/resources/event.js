'use strict';
const BaseDescendant = require('../components/base_descendant');

module.exports = class Collect extends BaseDescendant {

  get entity() {
    return 'event';
  }

  get entityRoute() {
    return '/events';
  }

};
