class BaseChild
	parent: "/parent"
	slug: "base"
	child: "/base"
	resource: require '../resource'

	constructor: (site) ->
		@site = site
		@prefix = "#{site}#{@parent}"

	all: (parentId, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}", params
		@resource.get url, "#{@slug}s", callback

	count: (parentId, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/count", params
		@resource.get url, "count", callback

	get: (parentId, id, params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/#{id}", params
		@resource.get url, @slug, callback

	create: (parentId, fields, callback) ->
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}"
		@resource.post url, @slug, fields, callback

	update: (parentId, id, fields, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/#{id}"
		@resource.put url, @slug, fields, callback

	delete: (parentId, id, callback) ->
		callback new Error 'missing' unless id?
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/#{id}"
		@resource.delete url, id, callback


module.exports = BaseChild
