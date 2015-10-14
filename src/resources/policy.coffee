Base = require './base'

class Policy extends Base
	slug: "policies"
	prefix: "/policies"

	constructor: (site) ->
		super(site)

	get: (callback) ->
		url = @resource.queryString "#{@prefix}"
		@resource.get url, @slug, callback


module.exports = Policy
