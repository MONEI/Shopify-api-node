Base = require './base'

class Discount extends Base
  slug: 'discount'
  prefix: '/discounts'

  constructor: (site) ->
    super(site)

  _isIdValid: (id) ->
    return false if typeof id not in ['string', 'number'] or id isnt 0 && !id
    return true

  disable: (id, callback) ->
    return callback new Error 'invalid or missing id' if !@_isIdValid id

    url = @resource.queryString "#{@prefix}/#{id}/disable"
    @resource.post url, @slug, callback

  enable: (id, callback) ->
    return callback new Error 'invalid or missing id' if !@_isIdValid id

    url = @resource.queryString "#{@prefix}/#{id}/enable"
    @resource.post url, @slug, callback

module.exports = Discount
