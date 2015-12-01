pluralize = require 'pluralize'
Base = require './base'

class Customer extends Base
  slug: 'customer'
  prefix: '/customers'

  constructor: (site) ->
    super site

  search: (params, callback) ->
    url = @resource.queryString "#{@prefix}/search", params
    @resource.get url, pluralize(@slug), callback

  createActivationUrl: (id, callback) ->
    url = @resource.queryString "#{@prefix}/#{id}/account_activation_url"
    slug = { short: @slug, long: 'account_activation_url' }
    @resource.post url, slug, { id: id }, callback

module.exports = Customer
