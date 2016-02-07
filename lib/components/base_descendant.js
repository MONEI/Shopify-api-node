// WTF ?!
'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

module.exports = class BaseChild {

  constructor(site) {
    this._route = site;
  }

  all(owner, params) {
    let url;
    // WTF x 23123123123123123 ?!
    if (!owner) {
      url = pluralize(this.entity);
      return Adapter.get(this.buildURL(url, params), pluralize(this.entity));
    }
    if (owner) {
      if (!params) {
        params = owner;
      }
      if (!params.resource) {
        params.resource = owner.resource;
      }
      if (!params.id) {
        params.id = owner.id;
      }
    }
    if (params && params.resource) {
      url = this._route + '/' + pluralize(params.resource);
      url += '/' + params.id + this.entityRoute;
      delete params.resource;
      delete params.id;
      url = this.applyParams(url, params);
      return Adapter.get(url, pluralize(this.entity));
    }
    url = pluralize(this.entity);
    return Adapter.get(this.buildURL(url, params), pluralize(this.entity));
  }

  count(owner, params) {
    let url;
    if (owner) {
      if (!params) {
        params = owner;
      }
      if (!params.resource) {
        params.resource = owner.resource;
      }
      if (!params.id) {
        params.id = owner.id;
      }
    }
    if (params && params.resource) {
      url = this._route + '/' + pluralize(params.resource);
      url += '/' + params.id + this.entityRoute + '/count';
      delete params.resource;
      delete params.id;
      url = this.applyParams(url, params);
      return Adapter.get(url, pluralize(this.entity));
    }
    url = this._route + '/' + pluralize(this.entity) + '/count';
    url = this.applyParams(url, params);
    return Adapter.get(url, pluralize(this.entity));
  }

  get(owner, id, params) {
    let url = this._route;
    if (typeof owner === 'object') {
      url += '/' + pluralize(owner.resource) + '/' + owner.id;
    } else {
      params = id;
      id = owner;
    }
    url += '/' + pluralize(this.entity) + '/' + id;
    return Adapter.get(this.applyParams(url, params), this.entity);
  }

  create(owner, fields) {
    let url = '';
    if (owner.resource) {
      url += pluralize(owner.resource) + '/' + owner.id + '/';
    }
    fields = fields || owner;
    url += pluralize(this.entity);
    return Adapter.post(this.buildURL(url), this.entity, fields);
  }

  update(owner, id, fields) {
    let url = '';
    if (owner.resource) {
      url += pluralize(owner.resource) + '/' + owner.id + '/';
    } else {
      fields = id;
      id = owner;
    }
    fields = fields || owner;
    url += pluralize(this.entity) + '/' + id;
    return Adapter.put(this.buildURL(url), this.entity, fields);
  }

  delete(owner, id) {
    let url = '';
    if (owner.resource) {
      url += pluralize(owner.resource) + '/' + owner.id + '/';
    } else {
      id = owner;
    }
    url += pluralize(this.entity) + '/' + id;
    return Adapter.delete(this.buildURL(url), id);
  }

  applyParams(url, params, format) {
    format = format || 'json';
    url += '.' + format;
    if (typeof params === 'object' && Object.keys(params).length) {
      params = qs.stringify(params, {arrayFormat: 'brackets'});
      url += '?' + params;
    }
    return url;
  }

  buildURL(record, params, format) {
    record = record ? '/' + record : '';
    format = format || 'json';
    let url = this._route + record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

};
