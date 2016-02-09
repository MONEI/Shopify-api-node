/**
 * @public
 * @class Discount
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Discount extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'discount';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/discounts';
  }

  /**
  * @public
  * @method disable
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  disable(id) {
    return Adapter.post(this.buildURL(id + '/disable'));
  }

  /**
  * @public
  * @method enable
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  enable(id) {
    return Adapter.post(this.buildURL(id + '/enable'));
  }

};
