/**
 * @public
 * @class Page
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class Page extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'page';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/pages';
  }

}

module.exports = Page;
