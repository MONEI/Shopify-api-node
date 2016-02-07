'use strict';
const Base = require('../components/base');

module.exports = class CarrierService extends Base {

  get entity() {
    return 'carrier_service';
  }

  get entityRoute() {
    return '/carrier_services';
  }

};
