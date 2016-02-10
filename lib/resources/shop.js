/**
 * @public
 * @class Shop
 * @extends BaseChild
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class Shop extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'shop';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/shops';
  }

  /**
  * @public
  * @description
  * @returns {object} promise - request promise
  */
  get() {
    let url = this._route.replace('shops', 'shop.json');
    return Adapter.get(url);
  }

}

module.exports = Shop;
