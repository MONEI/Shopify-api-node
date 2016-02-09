/**
 * @public
 * @class Policy
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

module.exports = class Policy extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'policy';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/policies';
  }

};
