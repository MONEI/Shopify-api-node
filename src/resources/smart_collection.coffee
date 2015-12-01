Base = require './base'

class SmartCollection extends Base
  slug: 'smart_collection'
  prefix: '/smart_collections'

  constructor: (site) ->
    super site

  order: (id, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/#{id}/order", params
    @resource.put url, undefined, {}, callback

module.exports = SmartCollection
