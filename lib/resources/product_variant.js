/**
 * @public
 * @class ProductVariant
 * @description
 * @requires base_child
 * @requires adapter
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class ProductVariant extends BaseChild {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'variant';
  }

  /**
  * @public
  * @method parentRoute
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/products';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/variants';
  }

  /**
  * @public
  * @method get
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
  * @method update
  * @description
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(id, fields) {
    let url = this._route.replace(this.parentRoute, '');
    return Adapter.put(url + '/variants/' + id + '.json', this.entity, fields);
  }

};
