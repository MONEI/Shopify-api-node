/**
 * @public
 * @class Fulfillment
 * @description
 * @requires base_child
 * @requires adapter
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class Fulfillment extends BaseChild {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'fulfillment';
  }

  /**
  * @public
  * @method parentRoute
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/orders';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/fulfillments';
  }


  /**
  * @public
  * @method complete
  * @param {int} orderId - id of order
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  complete(orderId, id) {
    return Adapter.post(this.buildURL(orderId, id + '/complete'));
  }

  /**
  * @public
  * @method cancel
  * @param {int} orderId - id of order
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  cancel(orderId, id) {
    return Adapter.post(this.buildURL(orderId, id + '/cancel'));
  }

  /**
  * @public
  * @method delete
  * @param {int} orderId - id of order
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  delete(orderId, id) {
    return this.cancel(orderId, id);
  }

};
