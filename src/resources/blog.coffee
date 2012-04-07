Base = require './base'

class Blog extends Base
	slug: "blog"
	prefix: "/blogs"

	constructor: (site) ->
		super(site)



module.exports = Blog
