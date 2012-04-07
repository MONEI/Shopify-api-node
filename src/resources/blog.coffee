Base = require './base'
Metafields = require './metafield'

class Blog extends Base
	slug: "blog"
	prefix: "/blogs"

	constructor: (site) ->
		@metafields = new Metafields(@prefix, site)
		super(site)



module.exports = Blog
