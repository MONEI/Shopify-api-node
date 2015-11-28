BaseChild = require './base_child'

class Asset extends BaseChild
  parent: '/themes'
  child: '/assets'
  slug: 'asset'

  constructor: (site) ->
    super(site)

  create: (parentId, fields, callback) ->
    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}"
    @resource.put url, @slug, fields, callback

  update: @::create

  get: (parentId, params, callback) ->
    params.asset || (params.asset = { key: params.key })
    delete params.key

    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}", params
    @resource.get url, @slug, callback

  delete: (parentId, key, callback) ->
    url = @resource.queryString "#{@prefix}/#{parentId}#{@child}", { asset: { key: key } }
    @resource.delete url, key, callback

module.exports = Asset
