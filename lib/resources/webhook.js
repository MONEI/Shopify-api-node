/**
 * @public
 * @class WebHook
 * @extends Base
 * @description
 * @requires base
 */
'use strict';
const Base = require('../components/base');

class WebHook extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'webhook';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/webhooks';
  }

}

module.exports = WebHook;
