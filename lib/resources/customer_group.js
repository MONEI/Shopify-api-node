/**
 * @public
 * @class CustomerGroup
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class CustomerGroup extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'customer_group';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/customer_groups';
  }

  /**
  * @public
  * @method customers
  * @param {int} id - customer id
  * @description
  * @returns {object} promise - request promise
  */
  customers(id) {
    return Adapter.post(this.buildURL(id + '/default'));
  }

};
