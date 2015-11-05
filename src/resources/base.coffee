pluralize = require 'pluralize'

class Base
	slug: "base"
	prefix: "/base"
	resource: require '../resource'

	constructor: (site) ->
		@prefix = "#{site}#{@prefix}"

	all: (params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString @prefix, params
		pluralizedSlug = pluralize(@slug)
		@resource.get url, "#{pluralizedSlug}", callback

	count: (params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}/count", params
		@resource.get url, "count", callback

	get: (id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}", params
		@resource.get url, @slug, callback

	create: (fields, callback) ->
		url = @resource.queryString @prefix
		@resource.post url, @slug, fields, callback

	update: (id, fields, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}"
		@resource.put url, @slug, fields, callback

	delete: (id, callback) ->
		callback new Error 'missing' unless id?
		url = @resource.queryString "#{@prefix}/#{id}"
		@resource.delete url, id, callback


module.exports = Base
