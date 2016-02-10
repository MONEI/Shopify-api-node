/**
 * @public
 * @class Location
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Location extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'location';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/locations';
  }

}

module.exports = Location;
