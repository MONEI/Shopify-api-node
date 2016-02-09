/**
 * @public
 * @class Event
 * @description
 * @requires base_descendant
 */
'use strict';
const BaseDescendant = require('../components/base_descendant');

module.exports = class Event extends BaseDescendant {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'event';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/events';
  }

};
