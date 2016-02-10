/**
 * @public
 * @class MetaField
 * @extends BaseDescendant
 * @description
 * @requires base_cdescendant
 */
'use strict';
const BaseDescendant = require('../components/base_descendant');

class MetaField extends BaseDescendant {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'metafield';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/metafields';
  }

}

module.exports = MetaField;
