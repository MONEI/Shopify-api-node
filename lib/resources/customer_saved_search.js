/**
 * @public
 * @class CustomerSavedSearch
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class CustomerSavedSearch extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'customer_saved_search';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/customer_saved_searches';
  }

  /**
  * @public
  * @param {int} id - customer id
  * @description
  * @returns {object} promise - request promise
  */
  getCustomersForId(id) {
    return Adapter.get(this.buildURL(id + '/customers'));
  }

}

module.exports = CustomerSavedSearch;
