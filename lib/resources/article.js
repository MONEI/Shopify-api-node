/**
 * @public
 * @class Article
 * @extends BaseChild
 * @description
 * @requires base_child
 */
'use strict';
const BaseChild = require('../components/base_child');

class Article extends BaseChild {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'article';
  }

  /**
  * @public
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/blogs';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/articles';
  }

}

module.exports = Article;
