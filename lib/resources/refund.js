/**
 * @public
 * @class Refund
 * @extends BaseChild
 * @description
 * @requires base_child
 */
'use strict';
const BaseChild = require('../components/base_child');

class Refund extends BaseChild {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'refund';
  }

  /**
  * @public
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/orders';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/refunds';
  }

}

module.exports = Refund;
