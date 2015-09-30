Base = require './base'

class Location extends Base
	slug: "location"
	prefix: "/locations"

	constructor: (site) ->
		super(site)



module.exports = Location
