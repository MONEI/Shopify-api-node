'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class RecurringApplicationCharge extends Base {

  get entity() {
    return 'recurring_application_charge';
  }

  get entityRoute() {
    return '/recurring_application_charges';
  }

  activate(id, fields) {
    return Adapter.post(this.buildURL(id + '/activate'), this.entity, fields);
  }

};
