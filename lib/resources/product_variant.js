/**
 * @public
 * @class ProductVariant
 * @extends BaseChild
 * @description
 * @requires base_child
 * @requires adapter
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

class ProductVariant extends BaseChild {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'variant';
  }

  /**
  * @public
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/products';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/variants';
  }

  /**
  * @public
  * @description
  * @param {int} id - record id
  * @returns {object} promise - request promise
  */
  get(id) {
    let url = this._route.replace(this.parentRoute, '');
    return Adapter.get(url + '/variants/' + id + '.json');
  }

  /**
  * @public
  * @description
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(id, fields) {
    let url = this._route.replace(this.parentRoute, '');
    return Adapter.put(url + '/variants/' + id + '.json', this.entity, fields);
  }

}

module.exports = ProductVariant;
