/**
 * @public
 * @class Checkout
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

module.exports = class Checkout extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'checkout';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/checkouts';
  }

};
