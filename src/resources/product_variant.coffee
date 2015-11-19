BaseChild = require './base_child'
Metafields = require './metafield'

class ProductVariant extends BaseChild
  parent: "/products"
  slug: "variant"
  child: "/variants"

  constructor: (site) ->
    super(site)

  get: (id, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@site}#{@child}/#{id}", params
    @resource.get url, @slug, callback


  update: (id, fields, callback) ->
    url = @resource.queryString "#{@site}#{@child}/#{id}"
    @resource.put url, @slug, fields, callback

module.exports = ProductVariant
