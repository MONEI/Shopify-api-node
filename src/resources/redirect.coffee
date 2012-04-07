Base = require './base'

class Redirect extends Base
	slug: "redirect"
	prefix: "/redirects"

	constructor: (site) ->
		super(site)



module.exports = Redirect
