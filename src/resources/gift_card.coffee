Base = require './base'
pluralize = require 'pluralize'

class GiftCard extends Base
  slug: 'gift_card'
  prefix: '/gift_cards'
  constructor: (site) ->
    super(site)

  getAll: (callback) ->
    @all(callback)

  checkValidStatus: (status, callback) ->
    callback new Error 'status is not valid' unless !!~["disabled", "enabled"].indexOf(status)

  getByStatus: (status, callback) ->
    @checkValidStatus(status, callback)
    @all({status:status}, callback)

  getCount: (callback) ->
    @count(undefined, callback)

  getCountByStatus: (status, callback) ->
    @checkValidStatus(status, callback)
    @count({status: status}, callback)

  search: (queryStr, callback) ->
    query = {query: queryStr}
    url = @resource.queryString "#{@prefix}/search", query
    @resource.get(url, pluralize(@slug), callback)

  disable: (id, callback) ->
    callback new Error 'missing id' unless id?
    url = @resource.queryString "#{@prefix}/#{id}/disable"

    params = {
      id: id
    }

    @resource.post url, @slug, params, callback


module.exports = GiftCard
