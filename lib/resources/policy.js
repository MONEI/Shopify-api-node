/**
 * @public
 * @class Policy
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Policy extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'policy';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/policies';
  }

}

module.exports = Policy;
