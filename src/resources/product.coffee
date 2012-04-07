Base = require './base'
Metafields = require './metafield'

class Product extends Base
	slug: "product"
	prefix: "/products"

	constructor: (site) ->
		@metafields = new Metafields(@prefix, site)
		super(site)
		

	events: (id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/events", params
		@resource.get url, "events", callback



module.exports = Product