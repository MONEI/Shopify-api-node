/**
 * @public
 * @class Redirect
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Redirect extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'redirect';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/redirects';
  }

}

module.exports = Redirect;
