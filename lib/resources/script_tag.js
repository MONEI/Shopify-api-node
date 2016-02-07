'use strict';
const Base = require('../components/base');

module.exports = class ScriptTag extends Base {

  get entity() {
    return 'script_tag';
  }

  get entityRoute() {
    return '/script_tags';
  }

};
