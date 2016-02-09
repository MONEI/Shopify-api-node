/**
 * @public
 * @class Country
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

module.exports = class Country extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'country';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/countries';
  }

};
