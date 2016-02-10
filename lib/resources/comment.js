/**
 * @public
 * @class Comment
 * @extends Base
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class Comment extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'comment';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/comments';
  }

  /**
  * @public
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  spam(id) {
    return Adapter.post(this.buildURL(id + '/spam'), this.entity);
  }

  /**
  * @public
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  notSpam(id) {
    return Adapter.post(this.buildURL(id + '/not_spam'), this.entity);
  }

  /**
  * @public
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  approve(id) {
    return Adapter.post(this.buildURL(id + '/approve'), this.entity);
  }

  /**
  * @public
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  remove(id) {
    return this.delete(id);
  }

  /**
  * @public
  * @param {int} id - comment id
  * @description
  * @returns {object} promise - request promise
  */
  delete(id) {
    return Adapter.post(this.buildURL(id + '/remove'), this.entity);
  }

}

module.exports = Comment;
