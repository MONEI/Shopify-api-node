/**
 * @public
 * @class SmartCollection
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class SmartCollection extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'smart_collection';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/smart_collections';
  }

  /**
  * @public
  * @method order
  * @description
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  order(id, params) {
    return Adapter.put(this.buildURL(id + '/order', params));
  }

};
