pluralize = require 'pluralize'

class Metafield
  resource: require '../resource'
  slug: 'metafield'

  constructor: (site) ->
    @prefix = "#{site}"

  all: (owner, params, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof owner is 'function'
      callback = owner
      params = null
    else if typeof params is 'function'
      callback = params
      params = owner

      if params.resource
        url = "#{url}/#{pluralize params.resource}/#{params.id}"
        params = null
    else
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"

    url = @resource.queryString "#{url}/#{slug}", params
    @resource.get url, slug, callback

  count: (owner, params, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof owner is 'function'
      callback = owner
      params = null
    else if typeof params is 'function'
      callback = params
      params = owner

      if params.resource
        url = "#{url}/#{pluralize params.resource}/#{params.id}"
        params = null
    else
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"

    url = @resource.queryString "#{url}/#{slug}/count", params
    @resource.get url, 'count', callback

  get: (owner, id, params, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof owner is 'object'
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"
    else
      callback = params
      params = id
      id = owner

    if typeof params is 'function'
      callback = params
      params = null

    url = @resource.queryString "#{url}/#{slug}/#{id}", params
    @resource.get url, @slug, callback

  create: (owner, fields, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof fields is 'function'
      callback = fields
      fields = owner
    else
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"

    url = @resource.queryString "#{url}/#{slug}"
    @resource.post url, @slug, fields, callback

  update: (owner, id, fields, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof fields is 'function'
      callback = fields
      fields = id
      id = owner
    else
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"

    url = @resource.queryString "#{url}/#{slug}/#{id}"
    @resource.put url, @slug, fields, callback

  delete: (owner, id, callback) ->
    slug = pluralize(@slug)
    url = @prefix

    if typeof id is 'function'
      callback = id
      id = owner
    else
      url = "#{url}/#{pluralize owner.resource}/#{owner.id}"

    url = @resource.queryString "#{url}/#{slug}/#{id}"
    @resource.delete url, id, callback

module.exports = Metafield
