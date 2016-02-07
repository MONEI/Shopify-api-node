'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class ApplicationCharge extends Base {

  get entity() {
    return 'application_charge';
  }

  get entityRoute() {
    return '/application_charges';
  }

  activate(id, fields) {
    return Adapter.post(this.buildURL(id + '/activate'), this.entity, fields);
  }

};
