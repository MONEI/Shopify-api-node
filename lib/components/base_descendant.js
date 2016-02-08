// WTF ?!
/**
 * @public
 * @class BaseDescendant
 * @description Concrete class for resources with descendant relationship
 * @requires pluralize
 * @requires adapter
 * @requires qs
 */
'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

module.exports = class BaseDescendant {

  /**
  * @private
  * @method constructor
  * @description sets the starting route for the current resource
  */
  constructor(site) {
    this._route = site;
  }

  /**
  * @public
  * @method all
  * @description Get all records for respective resource.
  * @param {object} owner - the owner of the current resource
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
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

  /**
  * @public
  * @method count
  * @description Get number of records for respective resource.
  * @param {object} owner - the owner of the current resource
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
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

  /**
  * @public
  * @method get
  * @description Get single record by id and params.
  * @param {object} owner - the owner of the current resource
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
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

  /**
  * @public
  * @method create
  * @description Create new record using fields.
  * @returns {object} owner - the owner of the current resource
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  create(owner, fields) {
    let url = '';
    if (owner.resource) {
      url += pluralize(owner.resource) + '/' + owner.id + '/';
    }
    fields = fields || owner;
    url += pluralize(this.entity);
    return Adapter.post(this.buildURL(url), this.entity, fields);
  }

  /**
  * @public
  * @method update
  * @description Update record id using fields.
  * @param {object} owner - the owner of the current resource
  * @param {int} id - id to be updated
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
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

  /**
  * @public
  * @method delete
  * @description Deletes record by owner and record id
  * @returns {object} owner - the owner of the current resource
  * @param {int} id - id to be deleted
  * @returns {object} promise - request promise
  */
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

  /**
  * @public
  * @method applyParams
  * @description Apply query params and format ext. to the existing url
  * @param {string} url - the existing url
  * @param {object} params - get parameters
  * @param {string} format - format type eg .json
  * @returns {string} url - the built url link
  */
  applyParams(url, params, format) {
    format = format || 'json';
    url += '.' + format;
    if (typeof params === 'object' && Object.keys(params).length) {
      params = qs.stringify(params, {arrayFormat: 'brackets'});
      url += '?' + params;
    }
    return url;
  }

  /**
  * @public
  * @method buildURL
  * @description Builds a url, by concatenating the route, the record,
  * the format, and the get parameters.
  * @param {string|int} record - current record
  * @param {object} params - get parameters
  * @param {string} format - format type
  * @returns {string} url - the built url link
  */
  buildURL(record, params, format) {
    record = record ? '/' + record : '';
    format = format || 'json';
    let url = this._route + record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

};
