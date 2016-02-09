/**
 * @public
 * @class Order
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Order extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'order';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/orders';
  }

  /**
  * @public
  * @method close
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  close(id) {
    return Adapter.get(this.buildURL(id + '/close'), this.entity);
  }

  /**
  * @public
  * @method open
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  open(id) {
    return Adapter.get(this.buildURL(id + '/open'), this.entity);
  }

  /**
  * @public
  * @method cancel
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @description
  * @returns {object} promise - request promise
  */
  cancel(id, params) {
    return Adapter.get(this.buildURL(id + '/cancel', params), this.entity);
  }

  /**
  * @public
  * @method events
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @description
  * @returns {object} promise - request promise
  */
  events(id, params) {
    return Adapter.get(this.buildURL(id + '/events', params), 'events');
  }

};
