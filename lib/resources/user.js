/**
 * @public
 * @class User
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class User extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'user';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/users';
  }

}

module.exports = User;
