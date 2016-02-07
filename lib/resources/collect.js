'use strict';
const Base = require('../components/base');

module.exports = class Collect extends Base {

  get entity() {
    return 'collect';
  }

  get entityRoute() {
    return '/collects';
  }

};
