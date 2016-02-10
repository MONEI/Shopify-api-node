/**
 * @public
 * @class FulfillmentService
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class FulfillmentService extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'fulfillment_service';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/fulfillment_services';
  }

}

module.exports = FulfillmentService;
