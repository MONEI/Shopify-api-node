'use strict';
const Base = require('../components/base');

module.exports = class WebHook extends Base {

  get entity() {
    return 'webhook';
  }

  get entityRoute() {
    return '/webhooks';
  }

};
