'use strict';
const Base = require('../components/base');

module.exports = class User extends Base {

  get entity() {
    return 'user';
  }

  get entityRoute() {
    return '/users';
  }

};
