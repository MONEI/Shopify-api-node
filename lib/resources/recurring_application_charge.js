/**
 * @public
 * @class RecurringApplicationCharge
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class RecurringApplicationCharge extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'recurring_application_charge';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/recurring_application_charges';
  }

  /**
  * @public
  * @method activate
  * @description
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  activate(id, fields) {
    return Adapter.post(this.buildURL(id + '/activate'), this.entity, fields);
  }

};
