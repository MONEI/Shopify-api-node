/**
 * @public
 * @class Customer
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class Customer extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'customer';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/customers';
  }

  /**
  * @public
  * @description
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  search(params) {
    return Adapter.get(this.buildURL('search', params), this.entity);
  }

  /**
  * @public
  * @description
  * @param {int} id - customer id
  * @returns {object} promise - request promise
  */
  createActivationUrl(id) {
    let url = this.buildURL(id + '/account_activation_url');
    let entity = {
      short: this.entity,
      long: 'account_activation_url'
    };
    return Adapter.post(url, entity, {id: id});
  }

}

module.exports = Customer;
