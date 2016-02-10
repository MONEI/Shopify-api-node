/**
 * @public
 * @class CustomCollection
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class CustomCollection extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'custom_collection';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/custom_collections';
  }

}

module.exports = CustomCollection;
