Base = require './base'

class Country extends Base
	slug: "country"
	prefix: "/countries"

	constructor: (site) ->
		super(site)

	all: (params, callback) ->  
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString @prefix, params
		@resource.get url, "countries", callback



module.exports = Country
