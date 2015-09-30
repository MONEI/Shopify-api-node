Base = require './base'

class Shop extends Base
	slug: "shop"
	prefix: "/shop"

	constructor: (site) ->
		super(site)

	get: (callback) ->
		url = @resource.queryString "#{@prefix}"
		@resource.get url, @slug, callback


module.exports = Shop
