'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

module.exports = class Base {

  constructor(site) {
    this._route = site + this.entityRoute;
  }

  all(params) {
    return Adapter.get(this.buildURL('', params), pluralize(this.entity));
  }

  count(params) {
    return Adapter.get(this.buildURL('count', params), 'count');
  }

  get(id, params) {
    return Adapter.get(this.buildURL(id, params), this.entity);
  }

  create(fields) {
    return Adapter.post(this.buildURL(), this.entity, fields);
  }

  update(id, fields) {
    return Adapter.put(this.buildURL(id), this.entity, fields);
  }

  delete(id) {
    return Adapter.delete(this.buildURL(id), id);
  }

  buildURL(record, params, format) {
    record = record ? '/' + record : '';
    format = format || 'json';
    let url = this._route + record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

};
