BaseChild = require './base_child'
pluralize = require 'pluralize'

class CustomerAddress extends BaseChild
  parent: '/customers'
  child: '/addresses'
  slug:
    short: 'address'
    long: 'customer_address'

  constructor: (site) ->
    super site

  all: (parentId, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}", params
    @resource.get url, pluralize(@slug.short), callback

  set: (parentId, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/set", params
    @resource.put url, undefined, {}, callback

  default: (parentId, id, callback) ->
    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/#{id}/default"
    @resource.put url, undefined, {}, (err, body) =>
      return callback err if err

      callback undefined, body[@slug.long]

module.exports = CustomerAddress
