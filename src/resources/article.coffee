BaseChild = require './base_child'
Metafields = require './metafield'

class Article extends BaseChild
	parent: "/blogs"
	slug: "article"
	child: "/articles"

	constructor: (site) ->
		super(site)


module.exports = Article
