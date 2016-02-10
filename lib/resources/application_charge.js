/**
 * @public
 * @class ApplicationCharge
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class ApplicationCharge extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'application_charge';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/application_charges';
  }

  /**
  * @public
  * @description Activates the specified record.
  * @param {int} id - record id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  activate(id, fields) {
    return Adapter.post(this.buildURL(id + '/activate'), this.entity, fields);
  }

}

module.exports = ApplicationCharge;
