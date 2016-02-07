'use strict';
const Base = require('../components/base');

module.exports = class Policy extends Base {

  get entity() {
    return 'policy';
  }

  get entityRoute() {
    return '/policies';
  }

};
