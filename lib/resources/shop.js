/**
 * @public
 * @class Shop
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Shop extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'shop';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/shops';
  }

  /**
  * @public
  * @method get
  * @description
  * @returns {object} promise - request promise
  */
  get() {
    let url = this._route.replace('shops', 'shop.json');
    return Adapter.get(url);
  }

};
