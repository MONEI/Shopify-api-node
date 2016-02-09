/**
 * @public
 * @class MetaField
 * @description
 * @requires base_cdescendant
 */
'use strict';
const BaseDescendant = require('../components/base_descendant');

module.exports = class MetaField extends BaseDescendant {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'metafield';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/metafields';
  }

};
