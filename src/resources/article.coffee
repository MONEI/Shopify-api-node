BaseChild = require './base_child'

class Article extends BaseChild
	parent: "/blogs"
	slug: "article"
	child: "/articles"

	constructor: (site) ->
		super(site)


module.exports = Article
