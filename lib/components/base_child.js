'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

module.exports = class BaseChild {

  constructor(site) {
    this._route = site + this.parentRoute;
  }

  all(parentId, params) {
    let url = this.buildURL(parentId, '', params);
    return Adapter.get(url, pluralize(this.entity));
  }

  count(parentId, params) {
    return Adapter.get(this.buildURL(parentId, 'count', params), 'count');
  }

  get(parentId, id, params) {
    return Adapter.get(this.buildURL(parentId, id, params), this.entity);
  }

  create(parentId, fields) {
    return Adapter.post(this.buildURL(parentId), this.entity, fields);
  }

  update(parentId, id, fields) {
    return Adapter.put(this.buildURL(parentId, id), this.entity, fields);
  }

  delete(parentId, id) {
    return Adapter.delete(this.buildURL(parentId, id), id);
  }

  buildURL(parentId, record, params, format) {
    let url = this._route + '/' + parentId + this.entityRoute;
    record = record ? '/' + record : '';
    format = format || 'json';
    url += record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

};
