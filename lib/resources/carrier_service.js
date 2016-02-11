/**
 * @public
 * @class CarrierService
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class CarrierService extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'carrier_service';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/carrier_services';
  }

}

module.exports = CarrierService;
