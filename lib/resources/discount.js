/**
 * @public
 * @class Discount
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class Discount extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'discount';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/discounts';
  }

  /**
  * @public
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  disable(id) {
    return Adapter.post(this.buildURL(id + '/disable'));
  }

  /**
  * @public
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  enable(id) {
    return Adapter.post(this.buildURL(id + '/enable'));
  }

}

module.exports = Discount;
