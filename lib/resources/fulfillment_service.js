'use strict';
const Base = require('../components/base');

module.exports = class FulfillmentService extends Base {

  get entity() {
    return 'fulfillment_service';
  }

  get entityRoute() {
    return '/fulfillment_services';
  }

};
