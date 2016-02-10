/**
 * @public
 * @class Theme
 * @extends BaseChild
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Theme extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'theme';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/themes';
  }

}

module.exports = Theme;
