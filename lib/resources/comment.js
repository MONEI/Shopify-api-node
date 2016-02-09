/**
 * @public
 * @class Comment
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Comment extends Base {

  /**
  * @public
  * @method entity
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'comment';
  }

  /**
  * @public
  * @method entityRoute
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/comments';
  }

  /**
  * @public
  * @method spam
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  spam(id) {
    return Adapter.post(this.buildURL(id + '/spam'), this.entity);
  }

  /**
  * @public
  * @method notSpam
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  notSpam(id) {
    return Adapter.post(this.buildURL(id + '/not_spam'), this.entity);
  }

  /**
  * @public
  * @method approve
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  approve(id) {
    return Adapter.post(this.buildURL(id + '/approve'), this.entity);
  }

  /**
  * @public
  * @method remove
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  remove(id) {
    return this.delete(id);
  }

  /**
  * @public
  * @method delete
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  delete(id) {
    return Adapter.post(this.buildURL(id + '/remove'), this.entity);
  }

};
