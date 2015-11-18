Base = require './base'

class Discount extends Base
  slug: 'discount'
  prefix: '/discounts'

  constructor: (site) ->
    super(site)

  disable: (id, callback) ->
    url = @resource.queryString "#{@prefix}/#{id}/disable"
    @resource.post url, @slug, callback

  enable: (id, callback) ->
    url = @resource.queryString "#{@prefix}/#{id}/enable"
    @resource.post url, @slug, callback

module.exports = Discount
