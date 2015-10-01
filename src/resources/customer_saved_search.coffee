Base = require './base'

class CustomerSavedSearch extends Base
	slug: "customer_saved_search"
	prefix: "/customer_saved_searches"

	constructor: (site) ->
		super(site)

	all: (params, callback) ->
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString @prefix, params
		@resource.get url, "customer_saved_searches", callback

	getCustomersForId: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/customers"
		@resource.get url, "customers", callback


module.exports = CustomerSavedSearch
