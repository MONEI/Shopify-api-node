/**
 * @public
 * @class Checkout
 * @description
 * @extends Base
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Checkout extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'checkout';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/checkouts';
  }

}

module.exports = Checkout;
