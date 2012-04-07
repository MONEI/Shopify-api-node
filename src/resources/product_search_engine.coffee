Base = require './base'
Metafields = require './metafield'

class ProductSearchEngine extends Base
	slug: "product_search_engine"
	prefix: "/product_search_engines"

	constructor: (site) ->
		super(site)
		


module.exports = ProductSearchEngine