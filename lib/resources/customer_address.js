/**
 * @public
 * @class CustomerAddress
 * @description
 * @requires base_child
 * @requires adapter
 * @requires pluralize
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');
const pluralize = require('pluralize');

module.exports = class CustomerAddress extends BaseChild {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return {
      short: 'address',
      long: 'customer_address'
    };
  }

  /**
  * @public
  * @method parentRoute
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/customers';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/addresses';
  }

  /**
  * @public
  * @method all
  * @description
  * @param {int} parentId - id of parent
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  all(parentId, params) {
    let url = this.buildURL(parentId, '', params);
    return Adapter.get(url, pluralize(this.entity.short));
  }

  /**
  * @public
  * @method set
  * @description
  * @param {int} parentId - id of parent
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  set(parentId, params) {
    return Adapter.put(this.buildURL(parentId, 'set', params), '', {});
  }

  /**
  * @public
  * @method default
  * @description
  * @param {int} parentId - id of parent
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  default(parentId, id) {
    return Adapter.put(this.buildURL(parentId, id + '/default'), '', {});
  }

};
