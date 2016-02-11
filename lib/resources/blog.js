/**
 * @public
 * @class Blog
 * @description
 * @extends Base
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Blog extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'blog';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/blogs';
  }

}

module.exports = Blog;
