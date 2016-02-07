'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Comment extends Base {

  get entity() {
    return 'comment';
  }

  get entityRoute() {
    return '/comments';
  }

  spam(id) {
    return Adapter.post(this.buildURL(id + '/spam'), this.entity);
  }

  notSpam(id) {
    return Adapter.post(this.buildURL(id + '/not_spam'), this.entity);
  }

  approve(id) {
    return Adapter.post(this.buildURL(id + '/approve'), this.entity);
  }

  remove(id) {
    return this.delete(id);
  }

  delete(id) {
    return Adapter.post(this.buildURL(id + '/remove'), this.entity);
  }

};
