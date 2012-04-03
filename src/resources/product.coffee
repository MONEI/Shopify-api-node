resource = require '../resource'

class Product
	prefix: "/products"

	constructor: (site) ->
		@prefix = "#{site}#{@prefix}"

	all: (params, callback) ->  
		[params, callback] = [callback, params] if typeof params is 'function'
		url = resource.queryString @prefix, params
		resource.get url, callback

	count: (params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = resource.queryString "#{@prefix}/count", params
		resource.get url, callback

	get: (id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = resource.queryString "#{@prefix}/#{id}", params
		resource.get url, callback

	create: (fields, callback) ->
		callback new Error 'Title is required' unless fields.product.title?
		url = resource.queryString @prefix
		resource.post url, fields, callback

	update: (id, fields, callback) ->
		callback new Error 'missing id' unless id?
		url = resource.queryString "#{@prefix}/#{id}"
		resource.put url, fields, callback


		
			





module.exports = Product