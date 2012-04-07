Base = require './base'

class Country extends Base
	slug: "collect"
	prefix: "/collects"

	constructor: (site) ->
		super(site)



module.exports = Country
