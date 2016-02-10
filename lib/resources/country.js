/**
 * @public
 * @class Country
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Country extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'country';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/countries';
  }

}

module.exports = Country;
