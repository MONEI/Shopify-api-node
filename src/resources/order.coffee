Base = require './base'
Metafields = require './metafield'

class Order extends Base 
	slug: "order"
	prefix: "/orders"

	constructor: (site) ->
		@metafields = new Metafields(@prefix, site)
		super(site)

	close: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/close"
		@resource.get url, @slug, callback

	open: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/open"
		@resource.get url, @slug, callback

	cancel: (id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/cancel", params
		@resource.get url, @slug, callback

	events: (id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/events", params
		@resource.get url, "events", callback


module.exports = Order