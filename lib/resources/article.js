/**
 * @public
 * @class Article
 * @description
 * @requires base_child
 */
'use strict';
const BaseChild = require('../components/base_child');

module.exports = class Article extends BaseChild {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'article';
  }

  /**
  * @public
  * @method parentRoute
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/blogs';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/articles';
  }

};
