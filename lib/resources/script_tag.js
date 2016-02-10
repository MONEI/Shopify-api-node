/**
 * @public
 * @class ScriptTag
 * @extends BaseChild
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class ScriptTag extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'script_tag';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/script_tags';
  }

}

module.exports = ScriptTag;
