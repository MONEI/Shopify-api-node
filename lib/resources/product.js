/**
 * @public
 * @class Product
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class Product extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'product';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/products';
  }

  /**
  * @public
  * @description
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  events(id, params) {
    return Adapter.get(this.buildURL(id, 'events', params));
  }

}

module.exports = Product;
