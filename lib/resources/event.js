/**
 * @public
 * @class Event
 * @extends BaseDescendant
 * @description
 * @requires base_descendant
 */
'use strict';
const BaseDescendant = require('../components/base_descendant');

class Event extends BaseDescendant {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'event';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/events';
  }

}

module.exports = Event;
