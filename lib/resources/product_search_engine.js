/**
 * @public
 * @class ProductSearchEngine
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class ProductSearchEngine extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'product_search_engine';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/product_search_engines';
  }

}

module.exports = ProductSearchEngine;
