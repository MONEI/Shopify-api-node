Base = require './base'
pluralize = require 'pluralize'

class GiftCard extends Base
  slug: 'gift_card'
  prefix: '/gift_cards'

  constructor: (site) ->
    super(site)

  disable: (id, callback) ->
    url = @resource.queryString "#{@prefix}/#{id}/disable"
    @resource.post url, @slug, { id: id }, callback

  search: (params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/search", params
    @resource.get url, pluralize(@slug), callback

module.exports = GiftCard
